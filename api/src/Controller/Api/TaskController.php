<?php

namespace App\Controller\Api;

use App\Entity\ChallengeScoreBoard;
use App\Entity\Task;
use App\Repository\ChallengeRepository;
use App\Repository\ChallengeScoreBoardRepository;
use App\Repository\HomeMemberRepository;
use App\Repository\ModelTaskRepository;
use App\Repository\TaskRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/v1/tasks")
 */
class TaskController extends AbstractController
{
    /**
     * @Route("/challenge_tasks/{id}", methods={"GET"})
     */
    public function listTasksInChallenge($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $challenge = $challengeRepository->find($id);
        if ($challenge == null || $challenge->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Challenge Not Found',
                'status_code' => 605,
                'status_name' => 'ChallengeNotFound'
            ], 404);
        }
        $tasks = $taskRepository->findBy(array('challenge' => $challenge->getId()));
        if ($tasks == null) {
            return $this->json([
                'tasks' => []
            ]);
        }
        $result = [];
        foreach ($tasks as $task) {
            $result[] = [
                'id' => $task->getId(),
                'name' => $task->getName(),
                'task_icon' => $task->getTaskIcon(),
                'icon_color' => $task->getIconColor(),
                'difficulty' => $task->getDifficulty(),
                'points_earned' => $task->getPointsEarned(),
                'completed_at' => $task->getCompletedAt(),
                'home_member_id' => $task->getHomeMember(),
                'challenge_id' => $task->getChallenge()
            ];
        }
        return $this->json([
            'tasks' => $result
        ]);
    }

    /**
     * @Route("/{id}", methods={"POST"})
     */
    public function new($id, Request $request, EntityManagerInterface $em, ChallengeRepository $challengeRepository, ModelTaskRepository $modelTaskRepository): Response
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
        if (isset($data['model_task_id'])) {
            $challenge = $challengeRepository->find($id);   
            if ($challenge == null || $challenge->getTidyUser() != $tidyUser) {
                return $this->json([
                    'status_message' => 'Challenge Not Found',
                    'status_code' => 605,
                    'status_name' => 'ChallengeNotFound'
                ], 404);
            }
            if ($challenge->getStatus() != 'created' && $challenge->getStatus() != 'active') {
                return $this->json([
                    'status_message' => 'Bad Request'
                ], 400);
            }
            $modelTask = $modelTaskRepository->find($data['model_task_id']);
            if ($modelTask == null || $modelTask->getTidyUser() != $tidyUser) {
                return $this->json([
                    'status_message' => 'Model Task Not Found',
                    'status_code' => 604,
                    'status_name' => 'ModelTaskNotFound'
                ], 404);
            }
            try {
                $task = new Task();
                $name = $modelTask->getName();
                $taskIcon = $modelTask->getTaskIcon();
                $iconColor = $modelTask->getIconColor();
                $difficulty = $modelTask->getDifficulty();
                $task->setName($name);
                $task->setTaskIcon($taskIcon);
                $task->setIconColor($iconColor);
                $task->setDifficulty($difficulty);
                $task->setChallenge($challenge);
                $em->persist($task);
                if ($challenge->getStatus() == 'created') {
                    $challenge->setStatus('active');
                }
                $em->flush();
                return $this->json([
                    'task' => [
                        'id' => $task->getId(),
                        'name' => $task->getName(),
                        'task_icon' => $task->getTaskIcon(),
                        'icon_color' => $task->getIconColor(),
                        'difficulty' => $task->getDifficulty(),
                        'points_earned' => $task->getPointsEarned(),
                        'completed_at' => $task->getCompletedAt(),
                        'home_member_id' => $task->getHomeMember(),
                        'challenge_id' => $task->getChallenge()
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
    public function show($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $task = $taskRepository->find($id);
        if ($task == null) {
            return $this->json([
                'status_message' => 'Task Not Found',
                'status_code' => 606,
                'status_name' => 'TaskNotFound'
            ], 404);
        }
        $challenge = $challengeRepository->find($task->getChallenge()->getId());
        if ($challenge == null) {
            return $this->json([
                'status_message' => 'Challenge Not Found',
                'status_code' => 605,
                'status_name' => 'ChallengeNotFound'
            ], 404);
        }
         else {
            $challengeUser = $challenge->getTidyUser();
        }
        if ($challengeUser != $tidyUser) {
            return $this->json([
                'status_message' => 'Challenge Not Found',
                'status_code' => 605,
                'status_name' => 'ChallengeNotFound'
            ], 404);
        }
        return $this->json([
            'task' => [
                'id' => $task->getId(),
                'name' => $task->getName(),
                'task_icon' => $task->getTaskIcon(),
                'icon_color' => $task->getIconColor(),
                'difficulty' => $task->getDifficulty(),
                'points_earned' => $task->getPointsEarned(),
                'completed_at' => $task->getCompletedAt(),
                'home_member_id' => $task->getHomeMember(),
                'challenge_id' => $task->getChallenge()->getId()
            ]
        ]);
    }


    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function edit($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository, EntityManagerInterface $em, Request $request): Response
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
        $task = $taskRepository->find($id);
        $challenge = $challengeRepository->find($task->getChallenge());
        if ($task == null || $challenge == null || $challenge->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Task Not Found',
                'status_code' => 606,
                'status_name' => 'TaskNotFound'
            ], 404);
        }
        if ($challenge->getStatus() != 'created' && $challenge->getStatus() != 'active') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        if (isset($data['name']) || isset($data['task_icon']) || isset($data['icon_color']) || isset($data['difficulty'])) {
            try {
                if (isset($data['name'])) {
                    $task->setName($data['name']);
                }
                if (isset($data['task_icon'])) {
                    $task->setTaskIcon($data['task_icon']);
                }
                if (isset($data['icon_color'])) {
                    $task->setIconColor($data['icon_color']);
                }
                if (isset($data['difficulty'])) {
                    $task->setDifficulty($data['difficulty']);
                }
                $em->flush();
                return $this->json([
                    'task' => [
                        'id' => $task->getId(),
                        'name' => $task->getName(),
                        'task_icon' => $task->getTaskIcon(),
                        'icon_color' => $task->getIconColor(),
                        'difficulty' => $task->getDifficulty(),
                        'points_earned' => $task->getPointsEarned(),
                        'completed_at' => $task->getCompletedAt(),
                        'home_member_id' => $task->getHomeMember(),
                        'challenge_id' => $task->getChallenge()
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
    public function delete($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository, EntityManagerInterface $em): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $task = $taskRepository->find($id);
        $challenge = $challengeRepository->find($task->getChallenge());
        if ($task == null || $challenge == null || $challenge->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Task Not Found',
                'status_code' => 606,
                'status_name' => 'TaskNotFound'
            ], 404);
        }
        if ($challenge->getStatus() != 'created' && $challenge->getStatus() != 'active') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        try {
            $taskRepository->remove($task, true);
            if ($challenge->getTasks() == null) {
                $challenge->setStatus('created');
            }
            $em->flush();
            return $this->json([
                'status_message' => 'Task deleted'
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * @Route("/complete/{id}", methods={"PUT"})
     */
    public function completeTask($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository, HomeMemberRepository $homeMemberRepository, ChallengeScoreBoardRepository $challengeScoreBoardRepository, EntityManagerInterface $em, Request $request): Response
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
        $task = $taskRepository->find($id);
        $challenge = $challengeRepository->find($task->getChallenge());
        if ($task == null || $challenge == null || $challenge->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Task Not Found',
                'status_code' => 606,
                'status_name' => 'TaskNotFound'
            ], 404);
        }
        if ($task->getCompletedAt() != null) {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        if ($challenge->getStatus() != 'active' && $challenge->getStatus() != 'started') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        if (isset($data['home_member_id']) && isset($data['completed_at'])) {
            try {
                $homeMember = $homeMemberRepository->find($data['home_member_id']);
                $task->setHomeMember($homeMember);
                $currentDate = new DateTimeImmutable();
                $completedAt = $data['completed_at'];
                $task->setCompletedAt($completedAt);
                $challengeEnd = $challenge->getStartDate();
                $challengeStart = $challenge->getEndDate();
                $challengeDiff = $challengeEnd->diff($challengeStart);
                $challengeDurationInDays = ($challengeDiff->days);
                $timeRemainingDiff = $challengeEnd->diff($currentDate);
                $timeRemainingInDays = ($timeRemainingDiff->days);
                if ($currentDate > $challengeEnd) {
                    $bonusPoints = 0;
                } else {
                    $bonusPoints = round(($timeRemainingInDays / $challengeDurationInDays) * 100);
                }
                $taskDifficulty = $task->getDifficulty();
                switch ($taskDifficulty) {
                    case 'easy':
                        $totalPoints = 100 + $bonusPoints;
                        break;
                    case 'medium':
                        $totalPoints = 200 + $bonusPoints;
                        break;
                    case 'hard':
                        $totalPoints = 300 + $bonusPoints;
                        break;
                    default:
                        return $this->json([
                            'status_message' => 'Internal Server Error'
                        ], 500);
                }
                $task->setPointsEarned($totalPoints);
                $em->flush();
                $tasksInChallenge = $challenge->getTasks();
                $isChallengeCompleted = true;
                foreach ($tasksInChallenge as $taskInChallenge) {
                    if ($taskInChallenge->getCompletedAt() == null) {
                        $isChallengeCompleted = false;
                        break;
                    }
                }
                if ($isChallengeCompleted) {
                    $challenge->setStatus('completed');
                    $tasksInChallenge = $challenge->getTasks();
                    $participants = [];
                    foreach ($tasksInChallenge as $task) {
                        $homeMemberId = $task->getHomeMember()->getId();
                        $taskPoints = $task->getPointsEarned();
                        $participants[$homeMemberId] = isset($participants[$homeMemberId]) ? $participants[$homeMemberId] + $taskPoints : $taskPoints;
                    }
                    usort(
                        $participants,
                        fn ($object1, $object2) =>
                        $object1 > $object2
                    );
                    $positionInRank = 1;
                    foreach ($participants as $homeMemberId => $totalPoints) {
                        $challengeScoreBoard = new ChallengeScoreBoard();
                        $homeMember = $homeMemberRepository->find($homeMemberId);
                        $challengeScoreBoard->setHomeMember($homeMember);
                        $challengeScoreBoard->setChallenge($challenge);
                        $challengeScoreBoard->setRankInChallenge($positionInRank);
                        $em->persist($challengeScoreBoard);
                        $em->flush();
                        $positionInRank += 1;
                    }
                }
                return $this->json([
                    'task' => [
                        'id' => $task->getId(),
                        'name' => $task->getName(),
                        'task_icon' => $task->getTaskIcon(),
                        'icon_color' => $task->getIconColor(),
                        'difficulty' => $task->getDifficulty(),
                        'points_earned' => $task->getPointsEarned(),
                        'completed_at' => $task->getCompletedAt(),
                        'home_member_id' => $task->getHomeMember(),
                        'challenge_id' => $task->getChallenge()
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
     * @Route("/remove_completion/{id}", methods={"PUT"})
     */
    public function removeTaskCompletion($id, TaskRepository $taskRepository, ChallengeRepository $challengeRepository, EntityManagerInterface $em, ChallengeScoreBoardRepository $challengeScoreBoardRepository, Request $request): Response
    {
        $tidyUser = $this->getUser();
        if ($tidyUser == null) {
            return $this->json([
                'status_message' => 'User Not Found',
                'status_code' => 601,
                'status_name' => 'UserNotFound'
            ], 404);
        }
        $task = $taskRepository->find($id);
        $challenge = $challengeRepository->find($task->getChallenge());
        if ($task == null || $challenge == null || $challenge->getTidyUser() != $tidyUser) {
            return $this->json([
                'status_message' => 'Task Not Found',
                'status_code' => 606,
                'status_name' => 'TaskNotFound'
            ], 404);
        }
        if ($task->getCompletedAt() == null) {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        if ($challenge->getStatus() == 'started' || $challenge->getStatus() == 'completed') {
            try {
                $task->setHomeMember(null);
                $task->setCompletedAt(null);
                $task->setPointsEarned(null);
                if ($challenge->getStatus() == 'completed') {
                    $challengeScoreBoards = $challengeScoreBoardRepository->findBy(array('challenge' => $challenge));
                    foreach ($challengeScoreBoards as $challengeScoreBoard) {
                        $challengeScoreBoardRepository->remove($challengeScoreBoard, true);
                    }             
                }
                $tasksInChallenge = $challenge->getTasks();
                $isChallengeActive = false;
                foreach ($tasksInChallenge as $taskInChallenge) {
                    if ($taskInChallenge->getCompletedAt() != null) {
                        $isChallengeCompleted = true;
                        break;
                    }
                }
                if ($isChallengeActive) {
                    $challenge->setStatus('active');
                } else {
                    $challenge->setStatus('started');
                }

                $em->flush();
                return $this->json([
                    'task' => [
                        'id' => $task->getId(),
                        'name' => $task->getName(),
                        'task_icon' => $task->getTaskIcon(),
                        'icon_color' => $task->getIconColor(),
                        'difficulty' => $task->getDifficulty(),
                        'points_earned' => $task->getPointsEarned(),
                        'completed_at' => $task->getCompletedAt(),
                        'home_member_id' => $task->getHomeMember(),
                        'challenge_id' => $task->getChallenge()
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
}
