<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220624095430 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE challenge DROP FOREIGN KEY FK_D70989514508E85C');
        $this->addSql('ALTER TABLE challenge ADD CONSTRAINT FK_D70989514508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE challenge_score_board DROP FOREIGN KEY FK_98A64F7298A21AC6');
        $this->addSql('ALTER TABLE challenge_score_board ADD CONSTRAINT FK_98A64F7298A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE home_member DROP FOREIGN KEY FK_80E093C54508E85C');
        $this->addSql('ALTER TABLE home_member ADD CONSTRAINT FK_80E093C54508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE model_task DROP FOREIGN KEY FK_7F29F7C24508E85C');
        $this->addSql('ALTER TABLE model_task ADD CONSTRAINT FK_7F29F7C24508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE challenge DROP FOREIGN KEY FK_D70989514508E85C');
        $this->addSql('ALTER TABLE challenge ADD CONSTRAINT FK_D70989514508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE challenge_score_board DROP FOREIGN KEY FK_98A64F7298A21AC6');
        $this->addSql('ALTER TABLE challenge_score_board ADD CONSTRAINT FK_98A64F7298A21AC6 FOREIGN KEY (challenge_id) REFERENCES challenge (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE home_member DROP FOREIGN KEY FK_80E093C54508E85C');
        $this->addSql('ALTER TABLE home_member ADD CONSTRAINT FK_80E093C54508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE model_task DROP FOREIGN KEY FK_7F29F7C24508E85C');
        $this->addSql('ALTER TABLE model_task ADD CONSTRAINT FK_7F29F7C24508E85C FOREIGN KEY (tidy_user_id) REFERENCES tidy_user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
