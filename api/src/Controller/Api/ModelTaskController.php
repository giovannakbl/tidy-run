<?php

namespace App\Controller\Api;

use App\Entity\ModelTask;
use App\Repository\ModelTaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/v1/model_tasks")
 */
class ModelTaskController extends AbstractController
{

    /**
     * @Route("", methods={"GET"})
     */
    public function listModelTasks(ModelTaskRepository $modelTaskRepository): Response
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
        $modelTasks = $modelTaskRepository->findBy(array('tidy_user' => $tidyUser_id));
        if ($modelTasks == null) {
            return $this->json([
                'model_tasks' => []
            ]);
        }
        $result = [];
        foreach ($modelTasks as $modelTask) {
            $result[] = [
                'id' => $modelTask->getId(),
                'name' => $modelTask->getName(),
                'task_icon' => $modelTask->getTaskIcon(),
                'icon_color' => $modelTask->getIconColor(),
                'difficulty' => $modelTask->getDifficulty()
            ];
        }
        return $this->json([
            'model_tasks' => $result
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
        if (isset($data['name']) && isset($data['task_icon']) && isset($data['icon_color']) && isset($data['difficulty'])) {
            try {
                $modelTask = new ModelTask();
                $modelTask->setName($data['name']);
                $modelTask->setTaskIcon($data['task_icon']);
                $modelTask->setIconColor($data['icon_color']);
                $modelTask->setDifficulty($data['difficulty']);
                $modelTask->setTidyUser($tidyUser);
                $em->persist($modelTask);
                $em->flush();
                return $this->json([
                    'model_task' => [
                        'id' => $modelTask->getId(),
                        'name' => $modelTask->getName(),
                        'task_icon' => $modelTask->getTaskIcon(),
                        'icon_color' => $modelTask->getIconColor(),
                        'difficulty' => $modelTask->getDifficulty()
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
    public function show($id, ModelTaskRepository $modelTaskRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $modelTask = $modelTaskRepository->find($id);
        if ($modelTask == null || $modelTask->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Model Task Not Found',
                'status_code' => 604,
                'status_name' => 'ModelTaskNotFound'
            ], 404);
        }
        $result = [
            'id' => $modelTask->getId(),
            'name' => $modelTask->getName(),
            'task_icon' => $modelTask->getTaskIcon(),
            'icon_color' => $modelTask->getIconColor(),
            'difficulty' => $modelTask->getDifficulty()
        ];
        return $this->json([
            'model_task' => $result
        ]);
    }


    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function edit($id, ModelTaskRepository $modelTaskRepository, EntityManagerInterface $em, Request $request): Response
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
        $modelTask = $modelTaskRepository->find($id);
        if ($modelTask == null || $modelTask->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Model Task Not Found',
                'status_code' => 604,
                'status_name' => 'ModelTaskNotFound'
            ], 404);
        }
        if (isset($data['name']) || isset($data['task_icon']) || isset($data['icon_color']) || isset($data['difficulty'])) {
            try {
                if (isset($data['name'])) {
                    $modelTask->setName($data['name']);
                }
                if (isset($data['task_icon'])) {
                    $modelTask->setTaskIcon($data['task_icon']);
                }
                if (isset($data['icon_color'])) {
                    $modelTask->setIconColor($data['icon_color']);
                }
                if (isset($data['difficulty'])) {
                    $modelTask->setDifficulty($data['difficulty']);
                }
                $em->flush();
                return $this->json([
                    'model_task' => [
                        'id' => $modelTask->getId(),
                        'name' => $modelTask->getName(),
                        'task_icon' => $modelTask->getTaskIcon(),
                        'icon_color' => $modelTask->getIconColor(),
                        'difficulty' => $modelTask->getDifficulty()
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
    public function delete($id, ModelTaskRepository $modelTaskRepository, EntityManagerInterface $em): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $modelTask = $modelTaskRepository->find($id);
        if ($modelTask == null || $modelTask->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Model Task Not Found',
                'status_code' => 604,
                'status_name' => 'ModelTaskNotFound'
            ], 404);
        }
        try {
            $modelTaskRepository->remove($modelTask, true);
            $em->flush();
            return $this->json([
                'status_message' => 'Model Task deleted'
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }
}
