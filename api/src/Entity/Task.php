<?php

namespace App\Entity;

use App\Repository\TaskRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TaskRepository::class)
 */
class Task
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
    private $task_icon;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $icon_color;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $difficulty;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $points_earned;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $completed_at;

    /**
     * @ORM\ManyToOne(targetEntity=Challenge::class, inversedBy="tasks")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     */
    private $challenge;

    /**
     * @ORM\ManyToOne(targetEntity=HomeMember::class, inversedBy="tasks")
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

    public function getTaskIcon(): ?string
    {
        return $this->task_icon;
    }

    public function setTaskIcon(string $task_icon): self
    {
        $this->task_icon = $task_icon;

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

    public function getDifficulty(): ?string
    {
        return $this->difficulty;
    }

    public function setDifficulty(string $difficulty): self
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getPointsEarned(): ?int
    {
        return $this->points_earned;
    }

    public function setPointsEarned(?int $points_earned): self
    {
        $this->points_earned = $points_earned;

        return $this;
    }

    public function getCompletedAt(): ?\DateTimeImmutable
    {
        return $this->completed_at;
    }

    public function setCompletedAt(?\DateTimeImmutable $completed_at): self
    {
        $this->completed_at = $completed_at;

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
