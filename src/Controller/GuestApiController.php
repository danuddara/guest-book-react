<?php

namespace App\Controller;

use App\Entity\Guest;
use App\Entity\SigneeInfo;
use App\Form\GuestType;
use App\Repository\GuestRepository;
use Doctrine\ORM\NonUniqueResultException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('api/guest/', name: 'app_guest_api')]
class GuestApiController extends AbstractController
{
    #[Route('list', name: 'app_guest_api_list')]
    public function index(Request $request,GuestRepository $guestRepository): Response
    {
        $pagination = $request->get('p') ? $request->get('p') : 1;

        $guests = $guestRepository->findByPagination($pagination);

        return $this->json($guests);
    }

    /**
     * @throws NonUniqueResultException
     */
    #[Route('count', name: 'app_guest_api_list_count')]
    public function count(GuestRepository $guestRepository)
    {
        $guests = $guestRepository->getTotalCount();
        return $this->json(current($guests));
    }

    #[Route('new', name: 'app_guest_api_new', methods: ['POST'])]
    public function new(Request $request, GuestRepository $guestRepository): Response
    {
        $guest = new Guest();
        if ($request->isMethod(Request::METHOD_POST)) {

            $values = json_decode($request->getContent(), true);


            if ($this->isCsrfTokenValid('guest-book', $values['crsfToken'])) {
                $name = $values['name'];
                $address =  $values['address'];
                $browser =  $values['browser'];
                $email =  $values['email'];
                $message =  $values['message'];

                $guest->setName(filter_var($name));
                $guest->setAddress(filter_var($address));
                $guest->setEmail(filter_var($email));
                $guest->setMessage(filter_var($message));

                $signeeInfo = new SigneeInfo();
                $signeeInfo->setBrowser($browser);
                $ip = $request->getClientIp();
                $os = $this->getClientOS($request);
                $signeeInfo->setIpAddress(filter_var($ip));
                $signeeInfo->setPlatform($os);
                $guest->setSigneeInfo($signeeInfo);
                $guestRepository->save($guest, true);
            }

        }

        return $this->json($guest->getId());
    }

    private function getClientOS(Request $request) {
        $u_agent = $request->server->get('HTTP_USER_AGENT') ?? '';
        $operating_system = 'Unknown Operating System';

        //Get the operating_system name
        if($u_agent) {
            if (preg_match('/linux/i', $u_agent)) {
                $operating_system = 'Linux';
            } elseif (preg_match('/macintosh|mac os x|mac_powerpc/i', $u_agent)) {
                $operating_system = 'Mac';
            } elseif (preg_match('/windows|win32|win98|win95|win16/i', $u_agent)) {
                $operating_system = 'Windows';
            } elseif (preg_match('/ubuntu/i', $u_agent)) {
                $operating_system = 'Ubuntu';
            } elseif (preg_match('/iphone/i', $u_agent)) {
                $operating_system = 'IPhone';
            } elseif (preg_match('/ipod/i', $u_agent)) {
                $operating_system = 'IPod';
            } elseif (preg_match('/ipad/i', $u_agent)) {
                $operating_system = 'IPad';
            } elseif (preg_match('/android/i', $u_agent)) {
                $operating_system = 'Android';
            } elseif (preg_match('/blackberry/i', $u_agent)) {
                $operating_system = 'Blackberry';
            } elseif (preg_match('/webos/i', $u_agent)) {
                $operating_system = 'Mobile';
            }
        } else {
            $operating_system = php_uname('s');
        }

        return $operating_system;
    }
}
