<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220624094933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB2598A21AC6');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB2598A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB2598A21AC6');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB2598A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
