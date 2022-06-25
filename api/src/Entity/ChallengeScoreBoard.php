<?php

namespace App\Entity;

use App\Repository\ChallengeScoreBoardRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChallengeScoreBoardRepository::class)
 */
class ChallengeScoreBoard
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $total_points;

    /**
     * @ORM\Column(type="integer")
     */
    private $rank_in_challenge;

    /**
     * @ORM\ManyToOne(targetEntity=Challenge::class, inversedBy="challengeScoreBoards")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     */
    private $challenge;

    /**
     * @ORM\ManyToOne(targetEntity=HomeMember::class, inversedBy="challengeScoreBoards")
     * @ORM\JoinColumn(nullable=false)
     */
    private $home_member;

    public function __toString()
    {
        return $this->id;
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTotalPoints(): ?int
    {
        return $this->total_points;
    }

    public function setTotalPoints(int $total_points): self
    {
        $this->total_points = $total_points;

        return $this;
    }

    public function getRankInChallenge(): ?int
    {
        return $this->rank_in_challenge;
    }

    public function setRankInChallenge(int $rank_in_challenge): self
    {
        $this->rank_in_challenge = $rank_in_challenge;

        return $this;
    }

    public function getChallenge(): ?Challenge
    {
        return $this->challenge;
    }

    public function setChallenge(?Challenge $challenge): self
    {
        $this->challenge = $challenge;

        return $this;
    }

    public function getHomeMember(): ?HomeMember
    {
        return $this->home_member;
    }

    public function setHomeMember(?HomeMember $home_member): self
    {
        $this->home_member = $home_member;

        return $this;
    }
}
