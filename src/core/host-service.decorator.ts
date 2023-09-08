/* eslint-disable prettier/prettier */
import { applyDecorators, Injectable, Scope } from '@nestjs/common';

export const TenantService = () =>
  applyDecorators(
    Injectable({ scope: Scope.REQUEST })
  );
``