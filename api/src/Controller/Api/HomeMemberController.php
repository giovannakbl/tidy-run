<?php

namespace App\Controller\Api;

use App\Repository\HomeMemberRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Knp\Component\Pager\PaginatorInterface;

class HomeMemberController extends AbstractController
{
    /**
     * @Route("/api/homemembers", methods={"GET"})
     */
    public function listHomeMembers(Request $request, HomeMemberRepository $homeMemberRepository): Response
    {
        $tidy_user_id = $request->query->get('tidy_user_id');
        $homeMembers = $homeMemberRepository->findBy(array('tidy_user' => $tidy_user_id));
        if ($tidy_user_id == null) {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        $result = [];
        if ($homeMembers != null) {
            foreach ($homeMembers as $homeMember) {
                $result[] = [
                    'id' => $homeMember->getId(),
                    'name' => $homeMember->getName(),
                    'avatar_icon' => $homeMember->getAvatarIcon(),
                    'icon_color' => $homeMember->getIconColor(),
                    'deleted_at' => $homeMember->getDeletedAt(),
                    'tidy_user_id' => $homeMember->getTidyUser()->getId(),
                    'tidy_user_email' => $homeMember->getTidyUser()->getEmail()
                ];
            }
        } else {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        
        return $this->json([
            'home_members' => $result
        ]);
    }

}
