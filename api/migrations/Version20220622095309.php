<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220622095309 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE challenge (id INT AUTO_INCREMENT NOT NULL, tidy_user_id INT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', name VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL, prize VARCHAR(255) DEFAULT NULL, INDEX IDX_D70989514508E85C (tidy_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE challenge_score_board (id INT AUTO_INCREMENT NOT NULL, challenge_id INT NOT NULL, home_member_id INT NOT NULL, name VARCHAR(255) NOT NULL, total_points INT NOT NULL, rank_in_challenge INT NOT NULL, INDEX IDX_98A64F7298A21AC6 (challenge_id), INDEX IDX_98A64F72B43AABA (home_member_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE home_member (id INT AUTO_INCREMENT NOT NULL, tidy_user_id INT NOT NULL, name VARCHAR(255) NOT NULL, avatar_icon VARCHAR(255) NOT NULL, icon_color VARCHAR(255) NOT NULL, deleted_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_80E093C54508E85C (tidy_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE model_task (id INT AUTO_INCREMENT NOT NULL, tidy_user_id INT NOT NULL, name VARCHAR(255) NOT NULL, task_icon VARCHAR(255) NOT NULL, icon_color VARCHAR(255) NOT NULL, difficulty VARCHAR(255) NOT NULL, INDEX IDX_7F29F7C24508E85C (tidy_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE task (id INT AUTO_INCREMENT NOT NULL, challenge_id INT NOT NULL, home_member_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, task_icon VARCHAR(255) NOT NULL, icon_color VARCHAR(255) NOT NULL, difficulty VARCHAR(255) NOT NULL, points_earned INT DEFAULT NULL, completed_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_527EDB2598A21AC6 (challenge_id), INDEX IDX_527EDB25B43AABA (home_member_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tidy_user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, home_name VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_C1A25857E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE challenge ADD CONSTRAINT FK_D70989514508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id)');
        $this->addSql('ALTER TABLE challenge_score_board ADD CONSTRAINT FK_98A64F7298A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id)');
        $this->addSql('ALTER TABLE challenge_score_board ADD CONSTRAINT FK_98A64F72B43AABA FOREIGN KEY (home_member_id) REFERENCES home_member (id)');
        $this->addSql('ALTER TABLE home_member ADD CONSTRAINT FK_80E093C54508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id)');
        $this->addSql('ALTER TABLE model_task ADD CONSTRAINT FK_7F29F7C24508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB2598A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id)');
        $this->addSql('ALTER TABLE task ADD CONSTRAINT FK_527EDB25B43AABA FOREIGN KEY (home_member_id) REFERENCES home_member (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE challenge_score_board DROP FOREIGN KEY FK_98A64F7298A21AC6');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB2598A21AC6');
        $this->addSql('ALTER TABLE challenge_score_board DROP FOREIGN KEY FK_98A64F72B43AABA');
        $this->addSql('ALTER TABLE task DROP FOREIGN KEY FK_527EDB25B43AABA');
        $this->addSql('ALTER TABLE challenge DROP FOREIGN KEY FK_D70989514508E85C');
        $this->addSql('ALTER TABLE home_member DROP FOREIGN KEY FK_80E093C54508E85C');
        $this->addSql('ALTER TABLE model_task DROP FOREIGN KEY FK_7F29F7C24508E85C');
        $this->addSql('DROP TABLE challenge');
        $this->addSql('DROP TABLE challenge_score_board');
        $this->addSql('DROP TABLE home_member');
        $this->addSql('DROP TABLE model_task');
        $this->addSql('DROP TABLE task');
        $this->addSql('DROP TABLE tidy_user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
