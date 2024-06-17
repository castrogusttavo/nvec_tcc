-- trigger para definir a data de criação na tabela tb_comunidade
delimiter $
create trigger trg_insert_comunidade 
before insert on tb_comunidade
for each row
begin
    set new.dt_criacao = current_date();
end;
$
delimiter ;

-- trigger para definir a data de criação na tabela tb_lista
delimiter $
create trigger trg_insert_lista 
before insert on tb_lista
for each row
begin
    set new.dt_criacao = current_date();
end;
$
delimiter ;

-- trigger para inserir na tabela tb_lista_variavel após inserção em tb_comunidade_usuario
DELIMITER $

CREATE TRIGGER after_insert_comunidade_usuario
AFTER INSERT ON tb_comunidade_usuario
FOR EACH ROW
BEGIN
    DECLARE lista_fixa_exists INT;

    SELECT COUNT(*) INTO lista_fixa_exists
    FROM tb_lista_fixa 
    WHERE id_lista_fixa = NEW.id_comunidade;

    IF lista_fixa_exists > 0 THEN
        INSERT INTO tb_lista_variavel (id_usuario, id_lista_fixa, end_lista)
        VALUES (NEW.id_usuario, NEW.id_comunidade, '');
    END IF;
END;
$

DELIMITER ;
