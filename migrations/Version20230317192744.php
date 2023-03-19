<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230317192744 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE guest (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, address VARCHAR(255) DEFAULT NULL, email VARCHAR(255) NOT NULL, message LONGTEXT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE signee_info (id INT AUTO_INCREMENT NOT NULL, guest_id INT DEFAULT NULL, browser VARCHAR(255) DEFAULT NULL, platform VARCHAR(255) DEFAULT NULL, ip_address VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_DEFBFBA9A4AA658 (guest_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE signee_info ADD CONSTRAINT FK_DEFBFBA9A4AA658 FOREIGN KEY (guest_id) REFERENCES guest (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE signee_info DROP FOREIGN KEY FK_DEFBFBA9A4AA658');
        $this->addSql('DROP TABLE guest');
        $this->addSql('DROP TABLE signee_info');
    }
}
