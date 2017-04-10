CREATE VIEW [Ops].[vCaseHeader]
as
	with fistAddress
	as
	(
		select * from Ops.trCaseAddress
	)
	select C.CaseId, C.CaseNumber, C.CaseStausId
	, (C.ClientFirstName + ' ' + C.ClientLastName) ClientName , CS.CaseStatusId, CS.Title as CaseStatus
	, C.RegisterDate, Ce.Title as CenterTitle
	, PM.FirstName + ' ' + PM.LastName Peacemaker, MobileNumber
	from Ops.trCase C
	JOIN Core.dmnCaseStatus CS ON C.CaseStausId = CS.CaseStatusId
	JOIN Core.dmnCenter Ce on Ce.CenterId = C.CenterId
	JOIN Ops.trPeacemaker PM ON C.PeaceMakerId = PM.PeaceMakerId
