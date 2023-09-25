<?php
include_once "includes/header.php";
include "../conexion.php";

if (!empty($_POST)) {
    $alert = "";
    if (empty($_POST['producto'])) {
        $alert = '<div class="alert alert-primary" role="alert">
              Todo los campos son requeridos
            </div>';
    } else {
        $codproducto = $_GET['id'];
        $proveedor = $_POST['proveedor'];
        $producto = $_POST['producto'];
        if ($_SESSION['rol'] != 4) {
            $codigo = $_POST['codigo'];
            $precio = $_POST['precio'];
            $preciocosto = $_POST['preciocosto'];
        }
        $color = $_POST['color'];
        $url = $_POST['url'];
        $complemento = $_POST['complemento'];
        $arnes = $_POST['arnes'];
        $campus = $_POST['campus'];
        
        $descipsion = $_POST['descipsion'];
        $ano = $_POST['ano'];

       if (empty($complemento)) {
            $complemento = " ";
        } else {
            $complemento = implode(",", $complemento);
        }
        if ($_SESSION['rol'] == 4) {
            $query_update = mysqli_query($conexion, "UPDATE producto SET  url = '$url'  WHERE codproducto = $codproducto");

            //consultar si en la tabla detalleproducto existe un regitro que idproducto sea igual a codproducto
            $query_detalle = mysqli_query($conexion, "SELECT * FROM detalleproducto WHERE idproducto = $codproducto");
            $result_detalle = mysqli_num_rows($query_detalle);
            if ($result_detalle != 0) {
                //actualizar
                $query_detalle = mysqli_query($conexion, "UPDATE detalleproducto SET color = '$color', complementos = '$complemento', descripcion = '$descipsion', ano = '$ano', marca = '$proveedor' WHERE idproducto = $codproducto");
            } else {
                $query_detalle = mysqli_query($conexion, "INSERT INTO detalleproducto(idproducto, color, complementos, descripcion, ano, marca) VALUES ($codproducto, '$color', '$complemento', '$descipsion', '$ano', '$proveedor')");
                echo $query_detalle;
                echo "INSERT INTO detalleproducto('idproducto', 'color', 'complementos', 'descripcion', 'ano', 'marca') VALUES ($codproducto, '$color', '$complemento', '$descipsion', '$ano', '$proveedor')";
            }
        } else {
            $query_update = mysqli_query($conexion, "UPDATE producto SET codigo = '$codigo', descripcion = '$producto', proveedor= $proveedor,precio= $precio, preciocosto =$preciocosto WHERE codproducto = $codproducto");
        }

        if ($query_update) {
            $alert = '<div class="alert alert-primary" role="alert">
              Producto Modificado
            </div>';
        } else {
            $alert = '<div class="alert alert-primary" role="alert">
                Error al Modificar
              </div>';
        }
    }
}

// Validar producto

if (empty($_REQUEST['id'])) {
    header("Location: lista_productos.php");
} else {
    $id_producto = $_REQUEST['id'];
    if (!is_numeric($id_producto)) {
        header("Location: lista_productos.php");
    }
    $query_producto = mysqli_query($conexion, "SELECT p.codproducto, p.codigo,p.url,  p.descripcion, p.precio,p.preciocosto, pr.codproveedor, pr.proveedor, dp.descripcion as des ,dp.ano ,dp.complementos , dp.color, dp.marca 
    FROM producto p 
    INNER JOIN proveedor pr ON p.proveedor = pr.codproveedor 
    LEFT JOIN detalleproducto dp on p.codproducto = dp.idproducto WHERE p.codproducto = $id_producto");
    $result_producto = mysqli_num_rows($query_producto);

    if ($result_producto > 0) {
        $data_producto = mysqli_fetch_assoc($query_producto);
    } else {
        header("Location: lista_productos.php");
    }
}
?>
<!-- Begin Page Content -->
<div class="container-fluid">

    <div class="row">
        <div class="col-lg-6 m-auto">

            <div class="card">
                <div class="card-header bg-primary text-white">
                    Modificar producto
                </div>
                <div class="card-body">
                    <form action="" method="post">
                        <?php echo isset($alert) ? $alert : ''; ?>
                        <?php if ($_SESSION['rol'] != 4) { ?>
                            <div class="form-group">
                                <label for="codigo">C贸digo de Barras</label>
                                <input type="text" placeholder="Ingrese c贸digo de barras" name="codigo" id="codigo" class="form-control" value="<?php echo $data_producto['codigo']; ?>">
                            </div>
                        <?php } ?>
                        <div class="form-group">
                            <label for="nombre">Proveedor</label>
                            <?php $query_proveedor = mysqli_query($conexion, "SELECT * FROM proveedor ORDER BY proveedor ASC");
                            if ($_SESSION['rol'] == 4) {
                                $query_proveedor = mysqli_query($conexion, "SELECT * FROM marcas ORDER BY nombre ASC");
                            }

                            $resultado_proveedor = mysqli_num_rows($query_proveedor);
                            mysqli_close($conexion);
                            ?>
                            <select id="proveedor" name="proveedor" class="form-control">
                                <?php
                                if ($_SESSION['rol'] == 4) {
                                ?>
                                    <option value="<?php echo $data_producto['marca']; ?>" selected><?php echo $data_producto['marca']; ?></option>
                                <?php
                                }else{
                                    ?>
                                    <option value="<?php echo $data_producto['codproveedor']; ?>" selected><?php echo $data_producto['proveedor']; ?></option>
                                     <?php
                                }
                                ?>

                                <?php
                                if ($resultado_proveedor > 0) {
                                    while ($proveedor = mysqli_fetch_array($query_proveedor)) {
                                        // code...
                                ?>
                                        <option value="
                    <?php
                                        if ($_SESSION['rol'] == 4) {
                                            echo $proveedor['Nombre'];
                                        } else {
                                            echo $proveedor['codproveedor'];
                                        }

                    ?>">
                                            <?php
                                            if ($_SESSION['rol'] == 4) {
                                                echo $proveedor['Nombre'];
                                            } else {
                                                echo $proveedor['proveedor'];
                                            }
                                            ?>
                                        </option>
                                <?php
                                    }
                                }
                                ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="producto">Producto</label>
                            <input type="text" class="form-control" placeholder="Ingrese nombre del producto" name="producto" id="producto" value="<?php echo htmlspecialchars($data_producto['descripcion']); ?>">


                        </div>
                        <?php if ($_SESSION['rol'] != 4) { ?>
                            <div class="form-group">
                                <label for="precio">Precio</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="precio" id="precio" value="<?php echo $data_producto['precio']; ?>">

                            </div>

                            <div class="form-group">
                                <label for="preciocosto">Precio Costo</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="preciocosto" id="preciocosto" value="<?php echo $data_producto['preciocosto']; ?>">

                            </div>

                        <?php } ?>



                        <?php if ($_SESSION['rol'] == 4) { ?>
                            <div class="form-group">
                                <label for="preciocosto">Descripcion</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="descipsion" id="descipsion" value="<?php echo $data_producto['des']; ?>">
                            </div>

                            <div class="form-group">
                                <label for="preciocosto">A&ntilde;o</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="ano" id="ano" value="<?php echo $data_producto['ano']; ?>">
                            </div>

                            <div class="form-group">
                                <label for="complementos">Complementos</label>
                                <div>
                                    <input type="checkbox" id="campus" name="campus" value="campus">
                                    <label for="campus">Campus</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="arnes" name="arnes" value="arnes">
                                    <label for="arnes">Arnes</label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="precio">Url</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="url" id="url" value="<?php echo $data_producto['url']; ?>">
                            </div>

                            <div class="form-group">
                                <label for="precio">Color</label>
                                <input type="text" placeholder="Ingrese precio" class="form-control" name="color" id="color" value="<?php echo $data_producto['color']; ?>">
                            </div>
                        <?php } ?>
                        <input type="submit" value="Actualizar Producto" class="btn btn-primary">
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(campus).click(function() {
            if ($(this).is(':checked')) {
                alert("Checkbox is checked.");
            } else {
                alert("Checkbox is unchecked.");
            }
        });
    </script>

</div>
<!-- /.container-fluid -->
<!-- End of Main Content -->
<?php include_once "includes/footer.php"; ?>