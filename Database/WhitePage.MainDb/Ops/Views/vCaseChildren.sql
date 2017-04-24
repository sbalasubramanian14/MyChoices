CREATE VIEW [Ops].[vCaseChildren]
AS 
select 
A.[CaseChildrenId],
A.[CaseId],
A.[Name],
A.[Age],
A.[GenderLookupId],
A.[RelationshipWithAbuserLookupId],

A.[CreatedBy],
A.[CreatedDateTime],
A.[ModifiedBy],
A.[ModifiedDatetime]

,Gender.Value as Gender
,Relation.Value as Relation

from Ops.trCaseChildren A
LEFT JOIN Core.dmnLookupDetail Gender ON Gender.LookupDetailId = A.GenderLookupId AND Gender.LookupId=1
LEFT JOIN Core.dmnLookupDetail Relation ON Relation.LookupDetailId = A.RelationshipWithAbuserLookupId AND Relation.LookupId=12;	
