import { Module } from '@nestjs/common';
import { FinancialMothService } from './financial_moth.service';
import { FinancialMothController } from './financial_moth.controller';

@Module({
  providers: [FinancialMothService],
  controllers: [FinancialMothController],
  exports: [FinancialMothService]
})
export class FinancialMothModule {}
