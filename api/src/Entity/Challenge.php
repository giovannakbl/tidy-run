<?php

namespace App\Entity;

use App\Repository\ChallengeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ChallengeRepository::class)
 */
class Challenge
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $created_at;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\Column(type="date")
     */
    private $start_date;

    /**
     * @ORM\Column(type="date")
     */
    private $end_date;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $prize;

    /**
     * @ORM\ManyToOne(targetEntity=TidyUser::class, inversedBy="challenges")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     */
    private $tidy_user;

    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="challenge", orphanRemoval=true)
     */
    private $tasks;

    /**
     * @ORM\OneToMany(targetEntity=ChallengeScoreBoard::class, mappedBy="challenge", orphanRemoval=true)
     */
    private $challengeScoreBoards;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->challengeScoreBoards = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(?\DateTimeInterface $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getPrize(): ?string
    {
        return $this->prize;
    }

    public function setPrize(?string $prize): self
    {
        $this->prize = $prize;

        return $this;
    }

    public function getTidyUser(): ?TidyUser
    {
        return $this->tidy_user;
    }

    public function setTidyUser(?TidyUser $tidy_user): self
    {
        $this->tidy_user = $tidy_user;

        return $this;
    }

    /**
     * @return Collection<int, Task>
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks[] = $task;
            $task->setChallenge($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getChallenge() === $this) {
                $task->setChallenge(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ChallengeScoreBoard>
     */
    public function getChallengeScoreBoards(): Collection
    {
        return $this->challengeScoreBoards;
    }

    public function addChallengeScoreBoard(ChallengeScoreBoard $challengeScoreBoard): self
    {
        if (!$this->challengeScoreBoards->contains($challengeScoreBoard)) {
            $this->challengeScoreBoards[] = $challengeScoreBoard;
            $challengeScoreBoard->setChallenge($this);
        }

        return $this;
    }

    public function removeChallengeScoreBoard(ChallengeScoreBoard $challengeScoreBoard): self
    {
        if ($this->challengeScoreBoards->removeElement($challengeScoreBoard)) {
            // set the owning side to null (unless already changed)
            if ($challengeScoreBoard->getChallenge() === $this) {
                $challengeScoreBoard->setChallenge(null);
            }
        }

        return $this;
    }
}
