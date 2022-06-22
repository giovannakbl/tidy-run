<?php

namespace App\Entity;

use App\Repository\ModelTaskRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ModelTaskRepository::class)
 */
class ModelTask
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
     * @ORM\ManyToOne(targetEntity=TidyUser::class, inversedBy="modelTasks")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tidy_user;

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

    public function getTidyUser(): ?TidyUser
    {
        return $this->tidy_user;
    }

    public function setTidyUser(?TidyUser $tidy_user): self
    {
        $this->tidy_user = $tidy_user;

        return $this;
    }
}
