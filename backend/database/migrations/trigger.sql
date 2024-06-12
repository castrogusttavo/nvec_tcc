delimiter $
create trigger trg_insert_comunidade 
	before insert on tb_comunidade
		for each row
			begin
				set new.dt_criacao=current_date();
			end;
end;
 $
delimiter ;


delimiter $
create trigger trg_insert_lista 
	before insert on tb_lista
		for each row
			begin
				set new.dt_criacao=current_date();
			end;
end;
 $ 
delimiter ;


delimiter $
create trigger insert_comunidade_usuario
after insert on tb_comunidade_usuario
for each row
begin
    declare lista_fixa_exists int;

    select count(*) into lista_fixa_exists
    from tb_lista_fixa 
    where id_lista_fixa = NEW.id_comunidade;

    if lista_fixa_exists > 0 then
        insert into tb_lista_variavel (id_usuario, id_lista_fixa, end_lista)
        values (NEW.id_usuario, NEW.id_comunidade, '');
    end if;
end;
$
delimiter ;

