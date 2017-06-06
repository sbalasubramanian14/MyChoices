CREATE FUNCTION Ops.getMetntalStatusDescription(@lookupValues varchar(500))
returns varchar(2000)
as
begin
	declare @result varchar(2000) = '';

	;with d
	as
	(
		select Value from dbo.func_split(@lookupValues, ',') A
		JOIN Core.dmnLookupDetail LD ON A.Element = LD.LookupDetailId
	)
	SELECT @result = COALESCE(@result + ', ', '') + Value
	FROM d
	WHERE Value IS NOT NULL

	return @result;
end
