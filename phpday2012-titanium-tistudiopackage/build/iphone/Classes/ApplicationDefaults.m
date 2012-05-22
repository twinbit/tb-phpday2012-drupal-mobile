/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"CxpF0Ndb9RCO3XFFprka1xAu5Ibp5mc1"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"wNEd8yjL2xmOQXPmQVi5qAas0w4ytqdO"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"neKgq3Pzl2odL27qVMTvimt97TysrNsl"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"qfalCKFseTFcGwaHQrZnL5y4J3hcX9jR"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"bWpBwJr3hdPpRcmnUs2HT01cvEdiruCz"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"KBLT6IF7GvXO1rhRvjQnt8zdMEBfEdch"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
