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
        $tidy_user = $this->getUser();
        if ($tidy_user == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $tidy_user_id = $tidy_user->getId();
        $homeMembers = $homeMemberRepository->findBy(array('tidy_user' => $tidy_user_id));
        if ($homeMembers == null) {
            return $this->json([
                'home_members' => []
            ]);
        }
        $result = [];
        foreach ($homeMembers as $homeMember) {
            if ($homeMember->getDeletedAt() == null) {
                $result[] = [
                    'id' => $homeMember->getId(),
                    'name' => $homeMember->getName(),
                    'avatar_icon' => $homeMember->getAvatarIcon(),
                    'icon_color' => $homeMember->getIconColor(),
                    'deleted_at' => $homeMember->getDeletedAt()
                ];
            }
        }
        return $this->json([
            'home_members' => $result
        ]);
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $tidy_user = $this->getUser();
        if ($tidy_user == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $data = $request->toArray();
        if (isset($data['name']) && isset($data['avatar_icon']) && isset($data['icon_color'])) {
            try {
                $homeMember = new HomeMember();
                $homeMember->setName($data['name']);
                $homeMember->setAvatarIcon($data['avatar_icon']);
                $homeMember->setIconColor($data['icon_color']);
                $homeMember->setTidyUser($tidy_user);
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
        $tidy_user = $this->getUser();
        if ($tidy_user == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidy_user) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
        if ($homeMember->getDeletedAt() == null) {
            $home_member_is_active = true;
        } else {
            $home_member_is_active = false;
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
            'home_member_is_active' => $home_member_is_active
        ]);
    }


    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function edit($id, HomeMemberRepository $homeMemberRepository, EntityManagerInterface $em, Request $request): Response
    {
        $data = $request->toArray();
        $tidy_user = $this->getUser();
        if ($tidy_user == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidy_user || $homeMember->getDeletedAt() != null) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
            if (isset($data['name']) || isset($data['avatar_icon']) || isset($data['icon_color'])) {
                try {
                    if (isset($data['name'])) {
                        $homeMember->setName($data['name']);
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
            
    } 
}

    /**
     * @Route("/{id}", methods={"DELETE"})
     */
    public function delete($id, HomeMemberRepository $homeMemberRepository, EntityManagerInterface $em): Response
    {
        $tidy_user = $this->getUser();
        if ($tidy_user == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $homeMember = $homeMemberRepository->find($id);
        if ($homeMember == null || $homeMember->getTidyUser() != $tidy_user || $homeMember->getDeletedAt() != null) {
            return $this->json([
                'status_message' => 'Home Member Not Found',
                'status_code' => 602,
                'status_name' => 'HomeMemberNotFound'
            ], 404);
        }
            try {
                $current_date = new DateTimeImmutable();
                $homeMember->setDeletedAt($current_date);
                $em->flush();
                return $this->json([
                    'status_message' => 'Home Member deleted',
                    'deleted_date' => $current_date
                ]);
            } catch (\Exception $exception) {
                return $this->json([
                    'status_message' => 'Internal Server Error'
                ], 500);
            }
        
    }
}
