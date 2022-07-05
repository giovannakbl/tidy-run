<?php

namespace App\Repository;

use App\Entity\HomeMember;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<HomeMember>
 *
 * @method HomeMember|null find($id, $lockMode = null, $lockVersion = null)
 * @method HomeMember|null findOneBy(array $criteria, array $orderBy = null)
 * @method HomeMember[]    findAll()
 * @method HomeMember[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class HomeMemberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, HomeMember::class);
    }

    public function add(HomeMember $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(HomeMember $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function getQueryByFilter($filter){
        $qb = $this->createQueryBuilder('hm');
        if (isset($filter['id'])) {
            $qb->andWhere('hm.id = :id');
            $qb->setParameter('id', $filter['id']);
        }
        if (isset($filter['tidy_user_id'])) {
            $qb->andWhere('hm.tidy_user = :tidy_user_id');
            $qb->setParameter('tidy_user_id', $filter['tidy_user_id']);
        }
        if (isset($filter['tidy_user_email'])) {
            $qb->join('hm.tidy_user', 'tu');
            $qb->andWhere('tu.email = :tidy_user_email');
            $qb->setParameter('tidy_user_email', $filter['tidy_user_email']);
        }

        return $qb->getQuery();
    }

//    /**
//     * @return HomeMember[] Returns an array of HomeMember objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('h.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?HomeMember
//    {
//        return $this->createQueryBuilder('h')
//            ->andWhere('h.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
