<?php

/**
 * Class State
 * @author Christoph Weiss
 */
class State extends DatabaseTable implements JsonSerializable
{
    private $id;
    private $description;

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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }


    /**
     * state constructor.
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
        $sql = 'INSERT INTO state (description)'
            . 'VALUES (:description)';
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
        $sql = "UPDATE state SET id=:id, description=:description
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

