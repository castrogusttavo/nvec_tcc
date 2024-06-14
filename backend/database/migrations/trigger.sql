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
delimiter $
create trigger insert_comunidade_usuario
after insert on tb_comunidade_usuario
for each row
begin
    declare lista_fixa_exists int;

    select count(*)
    into lista_fixa_exists
    from tb_lista_fixa 
    where id_comunidade = new.id_comunidade;

    if lista_fixa_exists > 0 then
        insert into tb_lista_variavel (id_usuario, id_lista_fixa, end_lista)
        values (new.id_usuario, 
               (select id_lista_fixa from tb_lista_fixa where id_comunidade = new.id_comunidade limit 1), 
               '');
    end if;
end;
$
delimiter ;
