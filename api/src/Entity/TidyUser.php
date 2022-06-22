<?php

namespace App\Entity;

use App\Repository\TidyUserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=TidyUserRepository::class)
 */
class TidyUser implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $home_name;

    /**
     * @ORM\OneToMany(targetEntity=ModelTask::class, mappedBy="tidy_user", orphanRemoval=true)
     */
    private $modelTasks;

    /**
     * @ORM\OneToMany(targetEntity=HomeMember::class, mappedBy="tidy_user", orphanRemoval=true)
     */
    private $homeMembers;

    /**
     * @ORM\OneToMany(targetEntity=Challenge::class, mappedBy="tidy_user", orphanRemoval=true)
     */
    private $challenges;

    public function __construct()
    {
        $this->modelTasks = new ArrayCollection();
        $this->homeMembers = new ArrayCollection();
        $this->challenges = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getHomeName(): ?string
    {
        return $this->home_name;
    }

    public function setHomeName(?string $home_name): self
    {
        $this->home_name = $home_name;

        return $this;
    }

    /**
     * @return Collection<int, ModelTask>
     */
    public function getModelTasks(): Collection
    {
        return $this->modelTasks;
    }

    public function addModelTask(ModelTask $modelTask): self
    {
        if (!$this->modelTasks->contains($modelTask)) {
            $this->modelTasks[] = $modelTask;
            $modelTask->setTidyUser($this);
        }

        return $this;
    }

    public function removeModelTask(ModelTask $modelTask): self
    {
        if ($this->modelTasks->removeElement($modelTask)) {
            // set the owning side to null (unless already changed)
            if ($modelTask->getTidyUser() === $this) {
                $modelTask->setTidyUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, HomeMember>
     */
    public function getHomeMembers(): Collection
    {
        return $this->homeMembers;
    }

    public function addHomeMember(HomeMember $homeMember): self
    {
        if (!$this->homeMembers->contains($homeMember)) {
            $this->homeMembers[] = $homeMember;
            $homeMember->setTidyUser($this);
        }

        return $this;
    }

    public function removeHomeMember(HomeMember $homeMember): self
    {
        if ($this->homeMembers->removeElement($homeMember)) {
            // set the owning side to null (unless already changed)
            if ($homeMember->getTidyUser() === $this) {
                $homeMember->setTidyUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Challenge>
     */
    public function getChallenges(): Collection
    {
        return $this->challenges;
    }

    public function addChallenge(Challenge $challenge): self
    {
        if (!$this->challenges->contains($challenge)) {
            $this->challenges[] = $challenge;
            $challenge->setTidyUser($this);
        }

        return $this;
    }

    public function removeChallenge(Challenge $challenge): self
    {
        if ($this->challenges->removeElement($challenge)) {
            // set the owning side to null (unless already changed)
            if ($challenge->getTidyUser() === $this) {
                $challenge->setTidyUser(null);
            }
        }

        return $this;
    }
}
