<?php

namespace App\Controller\Api;

use App\Entity\TidyUser;
use App\Repository\TidyUserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/api/v1/tidy_user")
 */
class TidyUserController extends AbstractController
{
    /**
     * @Route("/register", methods={"POST"})
     */
    public function new(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): Response
    {
        $data = $request->toArray();
        if (isset($data['email']) && isset($data['password'])) {
            try {
                $tidyUser = new TidyUser();
                $tidyUser->setEmail($data['email']);
                $hashedPassword = $passwordHasher->hashPassword($tidyUser, $data['password']);
                $tidyUser->setPassword($hashedPassword);
                $tidyUser->setRoles(["ROLE_USER"]);
                $em->persist($tidyUser);
                $em->flush();
                return $this->json([
                    'tidy_user' => [
                        'id' => $tidyUser->getId(),
                        'email' => $tidyUser->getEmail()
                    ]
                ]);
            } catch (\Exception $exception) {
                if ($exception->getCode() == 1062) {
                    return $this->json([
                        'status_message' => 'Email is already registered',
                        'status_code' => 603,
                        'status_name' => 'DuplicatedEmail'
                    ], 400);
                } else {
                    return $this->json([
                        'status_message' => 'Internal Server Error'
                    ], 500);
                }
            }
        } else {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function show(): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $result = [
            'id' => $tidyUser->getId(),
            'email' => $tidyUser->getEmail(),
            'home_name' => $tidyUser->getHomeName()
        ];
        return $this->json([
            'tidy_user' => $result
        ]);
    }

    /**
     * @Route("", methods={"PUT"})
     */
    public function edit(EntityManagerInterface $em, Request $request, UserPasswordHasherInterface $passwordHasher): Response
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
        if (isset($data['email']) || isset($data['password']) || isset($data['home_name'])) {
            try {
                if (isset($data['email'])) {
                    $tidyUser->setEmail($data['email']);
                }
                if (isset($data['password'])) {
                    $hashedPassword = $passwordHasher->hashPassword($tidyUser, $data['password']);
                    $tidyUser->setPassword($hashedPassword);
                }
                if (isset($data['home_name'])) {
                    $tidyUser->setHomeName($data['home_name']);
                }
                $em->flush();
                return $this->json([
                    'tidy_user' => [
                        'id' => $tidyUser->getId(),
                        'email' => $tidyUser->getEmail(),
                        'home_name' => $tidyUser->getHomeName()
                    ]
                ]);
            } catch (\Exception $exception) {
                if ($exception->getCode() == 1062) {
                    return $this->json([
                        'status_message' => 'Email is already registered',
                        'status_code' => 603,
                        'status_name' => 'DuplicatedEmail'
                    ], 400);
                } else {
                    return $this->json([
                        'status_message' => 'Internal Server Error'
                    ], 500);
                }
            }
        }
    }

    /**
     * @Route("", methods={"DELETE"})
     */
    public function delete(TidyUserRepository $tidyUserRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        try {
            $tidyUserRepository->remove($tidyUser, true);
            return $this->json([
                'status_message' => 'User deleted',
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }
}
