CREATE PROCEDURE [Ops].[getUserRoles]
AS

BEGIN
	SELECT  [RoleId] ,[Title] FROM [Auth].[dmnRole]
END
