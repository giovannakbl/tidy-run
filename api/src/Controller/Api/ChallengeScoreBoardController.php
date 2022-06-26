<?php

namespace App\Controller\Api;

use App\Repository\ChallengeRepository;
use App\Repository\ChallengeScoreBoardRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("/api/v1/challenge_score_boards")
 */
class ChallengeScoreBoardController extends AbstractController
{
    /**
     * @Route("/{id}", methods={"GET"})
     */
    public function listChallengeScoreBoards($id, ChallengeScoreBoardRepository $challengeScoreBoardRepository, ChallengeRepository $challengeRepository): Response
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
        if ($challenge->getStatus() != 'terminated' && $challenge->getStatus() != 'completed') {
            return $this->json([
                'status_message' => 'Bad Request'
            ], 400);
        }
        $result = [];
        $challengeScoreBoards = $challengeScoreBoardRepository->findBy(array('challenge' => $challenge));
        usort(
            $challengeScoreBoards,
            fn ($object1, $object2) =>
            $object1->getRankInChallenge() > $object2->getRankInChallenge()
        );
        foreach ($challengeScoreBoards as $challengeScoreBoard) {
            $result[] = [
                'id' => $challengeScoreBoard->getId(),
                'total_points' => $challengeScoreBoard->getTotalPoints(),
                'rank_in_challenge' => $challengeScoreBoard->getRankInChallenge(),
                'home_member_id' => $challengeScoreBoard->getHomeMember(),
                'challenge_id' => $challengeScoreBoard->getChallenge()
            ];
        }
        return $this->json([
            'challenge_score_boards' => $result
        ]);
    }
}