<?php

namespace App\Controller\Api;

use App\Entity\Challenge;
use App\Entity\ChallengeScoreBoard;
use App\Repository\ChallengeRepository;
use App\Repository\ChallengeScoreBoardRepository;
use App\Repository\HomeMemberRepository;
use DateTime;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Void_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/v1/challenges")
 */
class ChallengeController extends AbstractController
{

    /**
     * @Route("", methods={"GET"})
     */
    public function listChallenges(ChallengeRepository $challengeRepository): Response
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
        $challenges = $challengeRepository->findBy(array('tidy_user' => $tidyUser_id));
        if ($challenges == null) {
            return $this->json([
                'challenges' => []
            ]);
        }
        $result = [];
        foreach ($challenges as $challenge) {
            $result[] = [
                'id' => $challenge->getId(),
                'created_at' => $challenge->getCreatedAt(),
                'name' => $challenge->getName(),
                'status' => $challenge->getStatus(),
                'start_date' => $challenge->getStartDate(),
                'end_date' => $challenge->getEndDate(),
                'prize' => $challenge->getPrize()
            ];
        }
        return $this->json([
            'challenges' => $result
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
        if (isset($data['name']) && isset($data['start_date']) && isset($data['end_date']) && isset($data['prize'])) {
            if ($data['start_date'] > $data['end_date']) {
                return $this->json([
                    'status_message' => 'Bad Request'
                ], 400);
            }
            try {
                $challenge = new Challenge();
                $currentDate = new DateTimeImmutable();
                $challenge->setCreatedAt($currentDate);
                $challenge->setName($data['name']);
                $challenge->setStatus('created');
                $challenge->setTidyUser($tidyUser);
                $startDate = new DateTime($data['start_date']);
                $challenge->setStartDate($startDate);
                $endDate = new DateTime($data['end_date']);
                $challenge->setEndDate($endDate);
                $challenge->setPrize($data['prize']);
                $em->persist($challenge);
                $em->flush();
                return $this->json([
                    'challenge' => [
                        'id' => $challenge->getId(),
                        'created_at' => $challenge->getCreatedAt(),
                        'name' => $challenge->getName(),
                        'status' => $challenge->getStatus(),
                        'start_date' => $challenge->getStartDate(),
                        'end_date' => $challenge->getEndDate(),
                        'prize' => $challenge->getPrize()
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
    public function show($id, ChallengeRepository $challengeRepository): Response
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
        return $this->json([
            'challenge' => [
                'id' => $challenge->getId(),
                'created_at' => $challenge->getCreatedAt(),
                'name' => $challenge->getName(),
                'status' => $challenge->getStatus(),
                'start_date' => $challenge->getStartDate(),
                'end_date' => $challenge->getEndDate(),
                'prize' => $challenge->getPrize()
            ]
        ]);
    }


    /**
     * @Route("/{id}", methods={"PUT"})
     */
    public function edit($id, ChallengeRepository $challengeRepository, EntityManagerInterface $em, Request $request): Response
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
        if (isset($data['name']) || isset($data['start_date']) || isset($data['end_date']) || isset($data['prize'])) {
            try {
                if (isset($data['name'])) {
                    $challenge->setName($data['name']);
                }
                if (isset($data['start_date'])) {
                    $startDate = new DateTime($data['start_date']);
                    $challenge->setStartDate($startDate);
                }
                if (isset($data['end_date'])) {
                    $endDate = new DateTime($data['end_date']);
                    $challenge->setEndDate($endDate);
                }
                if (isset($data['prize'])) {
                    $challenge->setPrize($data['prize']);
                }
                if ($challenge->getStartDate() > $challenge->getEndDate()) {
                    return $this->json([
                        'status_message' => 'Bad Request'
                    ], 400);
                }
                $em->flush();
                return $this->json([
                    'challenge' => [
                        'id' => $challenge->getId(),
                        'created_at' => $challenge->getCreatedAt(),
                        'name' => $challenge->getName(),
                        'status' => $challenge->getStatus(),
                        'start_date' => $challenge->getStartDate(),
                        'end_date' => $challenge->getEndDate(),
                        'prize' => $challenge->getPrize()
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
    public function delete($id, ChallengeRepository $challengeRepository, EntityManagerInterface $em): Response
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
        if ($challenge->getStatus() != 'created' && $challenge->getStatus() != 'active') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        try {
            $challengeRepository->remove($challenge, true);
            $em->flush();
            return $this->json([
                'status_message' => 'Challenge deleted'
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * @Route("/terminate/{id}", methods={"PUT"})
     */
    public function terminateChallenge($id, ChallengeRepository $challengeRepository, HomeMemberRepository $homeMemberRepository, EntityManagerInterface $em): Response
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
        if ($challenge->getStatus() != 'started') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        try {
            $challenge->setStatus('terminated');
            $em->flush();
            $tasksInChallenge = $challenge->getTasks();
            $participants = [];
            foreach ($tasksInChallenge as $task) {
                if ($task->getCompletedAt() != null ) {
                $taskHomeMemberId = $task->getHomeMember()->getId();
                $taskPoints = $task->getPointsEarned();
                $participants[$taskHomeMemberId] = isset($participants[$taskHomeMemberId]) ? $participants[$taskHomeMemberId] + $taskPoints : $taskPoints;
                }
            }
            uasort(
                $participants,
                fn ($value1, $value2) =>
                $value1 < $value2
                );
            $positionInRank = 1;
            foreach ($participants as $rankHomeMemberId => $rankPoints) {
                $challengeScoreBoard = new ChallengeScoreBoard();
                $rankHomeMember = $homeMemberRepository->find($rankHomeMemberId);
                $challengeScoreBoard->setHomeMember($rankHomeMember);
                $challengeScoreBoard->setChallenge($challenge);
                $challengeScoreBoard->setRankInChallenge($positionInRank);
                $challengeScoreBoard->setTotalPoints($rankPoints);
                $em->persist($challengeScoreBoard);
                $em->flush();
                $positionInRank += 1;
            }
            return $this->json([
                'challenge' => [
                    'id' => $challenge->getId(),
                    'created_at' => $challenge->getCreatedAt(),
                    'name' => $challenge->getName(),
                    'status' => $challenge->getStatus(),
                    'start_date' => $challenge->getStartDate(),
                    'end_date' => $challenge->getEndDate(),
                    'prize' => $challenge->getPrize()
                ]
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }

    /**
     * @Route("/reopen/{id}", methods={"PUT"})
     */
    public function reopen($id, ChallengeRepository $challengeRepository, ChallengeScoreBoardRepository $challengeScoreBoardRepository, EntityManagerInterface $em): Response
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
        if ($challenge->getStatus() != 'terminated') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        try {
            $challenge->setStatus('started');
            $challengeScoreBoards = $challengeScoreBoardRepository->findBy(array('challenge' => $challenge));
            foreach ($challengeScoreBoards as $challengeScoreBoard) {
                $challengeScoreBoardRepository->remove($challengeScoreBoard, true);
            }      
            $em->flush();
            return $this->json([
                'challenge' => [
                    'id' => $challenge->getId(),
                    'created_at' => $challenge->getCreatedAt(),
                    'name' => $challenge->getName(),
                    'status' => $challenge->getStatus(),
                    'start_date' => $challenge->getStartDate(),
                    'end_date' => $challenge->getEndDate(),
                    'prize' => $challenge->getPrize()
                ]
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'status_message' => 'Internal Server Error'
            ], 500);
        }
    }

}
