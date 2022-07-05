<?php

namespace App\Entity;

use App\Repository\HomeMemberRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=HomeMemberRepository::class)
 */
class HomeMember
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $avatar_icon;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $icon_color;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $deleted_at;

    /**
     * @ORM\ManyToOne(targetEntity=TidyUser::class, inversedBy="homeMembers")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     */
    private $tidy_user;

    /**
     * @ORM\OneToMany(targetEntity=Task::class, mappedBy="home_member")
     */
    private $tasks;

    /**
     * @ORM\OneToMany(targetEntity=ChallengeScoreBoard::class, mappedBy="home_member")
     */
    private $challengeScoreBoards;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->challengeScoreBoards = new ArrayCollection();
    }

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

    public function getAvatarIcon(): ?string
    {
        return $this->avatar_icon;
    }

    public function setAvatarIcon(string $avatar_icon): self
    {
        $this->avatar_icon = $avatar_icon;

        return $this;
    }

    public function getIconColor(): ?string
    {
        return $this->icon_color;
    }

    public function setIconColor(string $icon_color): self
    {
        $this->icon_color = $icon_color;

        return $this;
    }

    public function getDeletedAt(): ?\DateTimeImmutable
    {
        return $this->deleted_at;
    }

    public function setDeletedAt(?\DateTimeImmutable $deleted_at): self
    {
        $this->deleted_at = $deleted_at;

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
            $task->setHomeMember($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getHomeMember() === $this) {
                $task->setHomeMember(null);
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
            $challengeScoreBoard->setHomeMember($this);
        }

        return $this;
    }

    public function removeChallengeScoreBoard(ChallengeScoreBoard $challengeScoreBoard): self
    {
        if ($this->challengeScoreBoards->removeElement($challengeScoreBoard)) {
            // set the owning side to null (unless already changed)
            if ($challengeScoreBoard->getHomeMember() === $this) {
                $challengeScoreBoard->setHomeMember(null);
            }
        }

        return $this;
    }
}
