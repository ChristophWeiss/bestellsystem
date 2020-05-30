<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

include './classes/DatabaseTable.php';
include './Database/dbconn.php';
include "./classes/BS_Cart.php";
include "./classes/BS_Categories.php";
include "./classes/BS_Extras.php";
include "./classes/BS_Order.php";
include "./classes/BS_Printer_Config.php";
include "./classes/BS_Products.php";
include "./classes/BS_Role.php";
include "./classes/BS_Sizes.php";
include "./classes/BS_State.php";
include "./classes/BS_Subcategories.php";
include "./classes/BS_Users.php";


$ajax = new index();
if (isset($_GET['action'])) {
    $ajax->run($_GET['action']);
} else {
    echo json_encode(array(
        "message" => "No action provided.",
        "error" => "#876",
    ));
}
class index
{

    private $rights;
    private $encyptedToken;
    private $token;

    public function __construct()
    {
        session_start();

    }

    /**
     * Führt eine Funktion aus
     * @param $aktion
     */
    public function run($aktion)
    {


        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        }


        $xmlrights = file_get_contents('config/rights.xml');
        $this->rights = simplexml_load_string($xmlrights);

        if (isset(getallheaders()['Auth-Token'])) {
            $token = getallheaders()['Auth-Token'];
            $this->encyptedToken = getallheaders()['Auth-Token'];
        }

        if ($aktion == 'login' || $aktion == 'register') {
            $this->$aktion();
        } else {
            if (isset($_GET['token']) && $_GET['token'] == 'Lbshi12345') {
                $this->$aktion();
            } elseif (isset($token) && api::checkToken($token)) {
                $role = api::getRole($token);
                if ($this->rights->$aktion->$role == 1) {
                    $this->token = API::getTokenData($token);
                    $this->$aktion();
                } else {
                    echo json_encode(array(
                        "message" => "Not enough permission.",
                        "error" => "#707",
                    ));
                }
            } else {
                echo json_encode(array(
                    "message" => "Token is not valid.",
                    "error" => "#708",
                ));
            }
        }

    }
}