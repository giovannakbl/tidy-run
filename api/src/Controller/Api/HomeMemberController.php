<?php

namespace App\Controller\Api;

use App\Entity\HomeMember;
use App\Repository\HomeMemberRepository;
use App\Repository\TidyUserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @Route("/api/v1/home_members")
 */
class HomeMemberController extends AbstractController
{

    /**
     * @Route("", methods={"GET"})
     */
    public function listHomeMembers(HomeMemberRepository $homeMemberRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $tidyUser_id = $tidyUser->getId();
        $homeMembers = $homeMemberRepository->findBy(array('tidy_user' => $tidyUser_id));
        if ($homeMembers == null) {
            return $this->json([
                'home_members' => []
            ]);
        }
        $resultActive = [];
        foreach ($homeMembers as $homeMember) {
            if ($homeMember->getDeletedAt() == null) {
                $resultActive[] = [
                    'id' => $homeMember->getId(),
                    'name' => $homeMember->getName(),
                    'avatar_icon' => $homeMember->getAvatarIcon(),
                    'icon_color' => $homeMember->getIconColor(),
                    'deleted_at' => $homeMember->getDeletedAt()
                ];
            }
        }
        $resultAll = [];
        foreach ($homeMembers as $homeMember) {
            
                $resultAll[] = [
                    'id' => $homeMember->getId(),
                    'name' => $homeMember->getName(),
                    'avatar_icon' => $homeMember->getAvatarIcon(),
                    'icon_color' => $homeMember->getIconColor(),
                    'deleted_at' => $homeMember->getDeletedAt()
                ];
            
        }
        return $this->json([
            'home_members' => $resultActive,
            'home_members_all' => $resultAll,
        ]);
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $data = $request->toArray();
        if (isset($data['name']) && isset($data['avatar_icon']) && isset($data['icon_color']) && strlen($data['name']) > 0 && strlen(trim($data['name'])) > 0) {
            try {
                $homeMember = new HomeMember();
                $homeMember->setName($data['name']);
                $homeMember->setAvatarIcon($data['avatar_icon']);
                $homeMember->setIconColor($data['icon_color']);
                $homeMember->setTidyUser($tidyUser);
                $em->persist($homeMember);
                $em->flush();
                return $this->json([
                    'home_member' => [
                        'id' => $homeMember->getId(),
                        'name' => $homeMember->getName(),
                        'avatar_icon' => $homeMember->getAvatarIcon(),
                        'icon_color' => $homeMember->getIconColor(),
                        'deleted_at' => $homeMember->getDeletedAt()
                    ]
                ]);
            } catch (\Exception $exception) {
                return $this->json([
                    'status_message' => 'Internal Server Error'
                ], 500);
            }
        } else {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
    }


    /**
     * @Route("/{id}", methods={"GET"})
     */
    public function show($id, HomeMemberRepository $homeMemberRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
        if ($homeMember->getDeletedAt() == null) {
            $homeMemberIsActive = true;
        } else {
            $homeMemberIsActive = false;
        }
        $result = [
            'id' => $homeMember->getId(),
            'name' => $homeMember->getName(),
            'avatar_icon' => $homeMember->getAvatarIcon(),
            'icon_color' => $homeMember->getIconColor(),
            'deleted_at' => $homeMember->getDeletedAt()
        ];
        return $this->json([
            'home_member' => $result,
            'home_member_is_active' => $homeMemberIsActive
        ]);
    }


    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function edit($id, HomeMemberRepository $homeMemberRepository, EntityManagerInterface $em, Request $request): Response
    {
        $data = $request->toArray();
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidyUser || $homeMember->getDeletedAt() != null) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
        
            if (isset($data['name']) || isset($data['avatar_icon']) || isset($data['icon_color'])) {
                try {
                    if (isset($data['name'])) {
                        if (strlen($data['name']) > 0 && strlen(trim($data['name'])) > 0) {
                            $homeMember->setName($data['name']);
                        } else {
                            return $this->json([
                                'status_message' => 'Bad Request'
                            ], 400);
                        }
                    }
                    if (isset($data['avatar_icon'])) {
                        $homeMember->setAvatarIcon($data['avatar_icon']);
                    }
                    if (isset($data['icon_color'])) {
                        $homeMember->setIconColor($data['icon_color']);
                    }
                    $em->flush();
                    return $this->json([
                        'home_member' => [
                            'id' => $homeMember->getId(),
                            'name' => $homeMember->getName(),
                            'avatar_icon' => $homeMember->getAvatarIcon(),
                            'icon_color' => $homeMember->getIconColor(),
                            'deleted_at' => $homeMember->getDeletedAt()
                        ]
                    ]);
                } catch (\Exception $exception) {
                    return $this->json([
                        'status_message' => 'Internal Server Error'
                    ], 500);
                }    
    } else {
        return $this->json([
            'status_message' => 'Bad Request'
        ], 400);
    }
}

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function delete($id, HomeMemberRepository $homeMemberRepository, EntityManagerInterface $em): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidyUser || $homeMember->getDeletedAt() != null) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
            try {
                $currentDate = new DateTimeImmutable();
                $homeMember->setDeletedAt($currentDate);
                $em->flush();
                return $this->json([
                    'status_message' => 'Home Member deleted'
                ]);
            } catch (\Exception $exception) {
                return $this->json([
                    'status_message' => 'Internal Server Error'
                ], 500);
            }
        
    }
}
