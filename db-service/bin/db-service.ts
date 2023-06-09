#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DbServiceStack } from '../lib/db-service-stack';

const app = new cdk.App();
new DbServiceStack(app, 'DbServiceStack');
