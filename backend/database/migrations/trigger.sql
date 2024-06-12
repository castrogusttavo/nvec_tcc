delimiter $

create trigger trg_insert_comunidade 
	before insert on tb_comunidade
		for each row
			begin
				set new.dt_criacao=current_date();
			end;
end $

delimiter $

create trigger trg_insert_lista 
	before insert on tb_lista
		for each row
			begin
				set new.dt_criacao=current_date();
			end;
end $