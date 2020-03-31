<?php

/**
 * Class BS_Products
 * @author Christoph Weiss
 */
class BS_Products extends DatabaseTable implements JsonSerializable
{
    private $id;
    private $name;
    private $sizes_id;
    private $categories_id;
    private $price;

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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getSizesId()
    {
        return $this->sizes_id;
    }

    /**
     * @param mixed $sizes_id
     */
    public function setSizesId($sizes_id)
    {
        $this->sizes_id = $sizes_id;
    }

    /**
     * @return mixed
     */
    public function getCategoriesId()
    {
        return $this->categories_id;
    }

    /**
     * @param mixed $categories_id
     */
    public function setCategoriesId($categories_id)
    {
        $this->categories_id = $categories_id;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price)
    {
        $this->price = $price;
    }



    /**
     * BS_products constructor.
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
        $sql = 'INSERT INTO BS_products (name,sizes_id,categories_id,price)'
            . 'VALUES (:name,:sizes_id,:categories_id,:price)';
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
        $sql = "UPDATE BS_products SET id=:id, name=:name,sizes_id=:sizes_id,categories_id=:categories_id,price=:price
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

