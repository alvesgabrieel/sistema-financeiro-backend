import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { FinancialMothModule } from '../financial_moth/financial_moth.module';

@Module({
  imports: [FinancialMothModule],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
