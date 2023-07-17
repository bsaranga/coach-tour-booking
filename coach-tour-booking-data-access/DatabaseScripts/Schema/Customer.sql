IF OBJECT_ID('dbo.Customer', 'U') IS NOT NULL 
  DROP TABLE dbo.Customer; 
GO

CREATE TABLE Customer
(
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Surname NVARCHAR(50),
    EmailAddress NVARCHAR(50),
    DateOfBirth DATETIME,
    EUPassportNumber NVARCHAR(20),
    Address1 NVARCHAR(50),
    Address2 NVARCHAR(50),
    Country NVARCHAR(50),
    Phone NVARCHAR(20),
    ExternalAuthId NVARCHAR(50)
)