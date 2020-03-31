<?php

/**
 * Class BS_Order
 * @author Christoph Weiss
 */
class BS_Order extends DatabaseTable implements JsonSerializable
{
    private $id;
    private $date;
    private $state_id;
    private $users_id;
    private $table_nr;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * @param mixed $date
     */
    public function setDate($date)
    {
        $this->date = $date;
    }

    /**
     * @return mixed
     */
    public function getStateId()
    {
        return $this->state_id;
    }

    /**
     * @param mixed $state_id
     */
    public function setStateId($state_id)
    {
        $this->state_id = $state_id;
    }

    /**
     * @return mixed
     */
    public function getUsersid()
    {
        return $this->users_id;
    }

    /**
     * @param mixed $users_id
     */
    public function setUsersid($users_id)
    {
        $this->users_id = $users_id;
    }

    /**
     * @return mixed
     */
    public function getTableNr()
    {
        return $this->table_nr;
    }

    /**
     * @param mixed $table_nr
     */
    public function setTableNr($table_nr)
    {
        $this->table_nr = $table_nr;
    }




    /**
     * BS_Order constructor.
     * @param array $data
     */

    public function __construct($data = array())
    {
        if ($data) {
            foreach ($data as $key => $value) {
                $setterName = "set" . ucfirst($key);
                if (method_exists($this, $setterName)) {
                    if (empty($value))
                        $value = null;
                    $this->$setterName($value);
                }
            }
        }
    }


    public function toArray($mitId = true)
    {
        $attributs = get_object_vars($this);
        if ($mitId === false) {
            unset($attributs['id']);
        }
        return $attributs;
    }

    /**
     * Saves values to Database or updates them
     */
    public function save()
    {
        if ($this->getId() > 0) {
            $this->_update();
        } else {
            $this->_insert();
        }
    }


    /**
     * @inheritDoc
     */
    protected function _insert()
    {
        $sql = 'INSERT INTO BS_order (date,state_id,users_id,table_nr)'
            . 'VALUES (:date,:state_id,:users_id,:table_nr)';
        $query = Database::getDB()->prepare($sql);
        $query->execute($this->toArray(false));

        // setze die ID auf den von der DB generierten Wert
        $this->id = Database::getDB()->lastInsertId();
    }

    /**
     * @inheritDoc
     */
    protected function _update()
    {
        $sql = "UPDATE BS_order SET id=:id, date=:date,state_id=:state_id,users_id=:users_id,table_nr=:table_nr
            WHERE id=:id";

        $query = Database::getDB()->prepare($sql);
        $query->execute($this->toArray());
    }

    /**
     * @inheritDoc
     */
    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
}

