<?php

namespace App\Repository;

use App\Entity\ChallengeScoreBoard;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ChallengeScoreBoard>
 *
 * @method ChallengeScoreBoard|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChallengeScoreBoard|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChallengeScoreBoard[]    findAll()
 * @method ChallengeScoreBoard[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChallengeScoreBoardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChallengeScoreBoard::class);
    }

    public function add(ChallengeScoreBoard $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(ChallengeScoreBoard $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return ChallengeScoreBoard[] Returns an array of ChallengeScoreBoard objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ChallengeScoreBoard
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
