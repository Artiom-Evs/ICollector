IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[Items]'))
    ALTER FULLTEXT INDEX ON [dbo].[Items] DISABLE
IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[ItemComments]'))
    ALTER FULLTEXT INDEX ON [dbo].[ItemComments] DISABLE
IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[Collections]'))
    ALTER FULLTEXT INDEX ON [dbo].[Collections] DISABLE
GO

IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[Items]'))
    DROP FULLTEXT INDEX ON [dbo].[Items];
IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[ItemComments]'))
    DROP FULLTEXT INDEX ON [dbo].[ItemComments];
IF  EXISTS (SELECT * FROM sys.fulltext_indexes fti WHERE fti.object_id = OBJECT_ID(N'[dbo].[Collections]'))
    DROP FULLTEXT INDEX ON [dbo].[Collections];
GO

IF EXISTS (SELECT * FROM sys.fulltext_catalogs WHERE [name]='FTCApplicationDB')
    DROP FULLTEXT CATALOG FTCApplicationDB;
GO

CREATE FULLTEXT CATALOG FTCApplicationDB AS DEFAULT;

CREATE FULLTEXT INDEX ON dbo.Items(Name, Text1, Text2, Text3, Multiline1, Multiline2, Multiline3) KEY INDEX PK_Items ON FTCApplicationDB WITH STOPLIST = OFF, CHANGE_TRACKING AUTO;
CREATE FULLTEXT INDEX ON dbo.ItemComments(Text) KEY INDEX PK_ItemComments ON FTCApplicationDB WITH STOPLIST = OFF, CHANGE_TRACKING AUTO;
CREATE FULLTEXT INDEX ON dbo.Collections(Name, Description) KEY INDEX PK_Collections ON FTCApplicationDB WITH STOPLIST = OFF, CHANGE_TRACKING AUTO;
