<?php

namespace App\Repository;

use App\Entity\Guest;
use App\Entity\SigneeInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use Doctrine\ORM\Query\Expr\Join;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Guest>
 *
 * @method Guest|null find($id, $lockMode = null, $lockVersion = null)
 * @method Guest|null findOneBy(array $criteria, array $orderBy = null)
 * @method Guest[]    findAll()
 * @method Guest[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class GuestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Guest::class);
    }

    public function save(Guest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Guest $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function findByPagination($pagination=null,$maxItems =10)
    {
        $offset = $pagination > 1 ? (($pagination-1) * $maxItems) : 0 ;
        $qb = $this->createQueryBuilder('g');
        $qb->select('g.id,g.name,g.address,g.email,g.message,s.browser,s.platform,s.ipAddress');
        $qb->leftJoin(SigneeInfo::class,'s',Join::WITH,'s.guest = g.id');
        $qb->setFirstResult($offset)
        ->setMaxResults($maxItems);

        return  $qb->getQuery()->getResult();
    }

    /**
     * @throws NonUniqueResultException
     */
    public function getTotalCount()
    {
        $qb = $this->createQueryBuilder('g');
        $qb->select('COUNT(g.id)');

        return  $qb->getQuery()->getOneOrNullResult();

    }

//    /**
//     * @return Guest[] Returns an array of Guest objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('g.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Guest
//    {
//        return $this->createQueryBuilder('g')
//            ->andWhere('g.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
