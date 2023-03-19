<?php

namespace App\Entity;

use App\Repository\GuestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Ignore;
use Symfony\Component\Serializer\Annotation\SerializedName;

#[ORM\Entity(repositoryClass: GuestRepository::class)]
class Guest
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(type: "text", nullable: true)]
    private ?string $message = null;

    #[ORM\OneToOne(mappedBy: 'guest', cascade: ['persist', 'remove'])]
    #[Ignore]
    private ?SigneeInfo $signeeInfo = null;

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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
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

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getSigneeInfo(): ?SigneeInfo
    {
        return $this->signeeInfo;
    }

    public function setSigneeInfo(?SigneeInfo $signeeInfo): self
    {
        // unset the owning side of the relation if necessary
        if ($signeeInfo === null && $this->signeeInfo !== null) {
            $this->signeeInfo->setGuest(null);
        }

        // set the owning side of the relation if necessary
        if ($signeeInfo !== null && $signeeInfo->getGuest() !== $this) {
            $signeeInfo->setGuest($this);
        }

        $this->signeeInfo = $signeeInfo;

        return $this;
    }
}
