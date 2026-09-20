import { Body, Controller, Post, Req, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpenseService } from './expense.service';
import type { ExpenseDto } from './dtos/expense.dto';
import { Expense } from './interfaces/expense.interface';
import type { Request } from 'express';
import { parse } from 'csv-parse/sync';
import 'multer';

@Controller('expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    async createExpense(
        @Body() expenseDto: ExpenseDto,
        @Req() req: Request
    ): Promise<Expense> {
        if (!req.user) throw new UnauthorizedException();

        return this.expenseService.createExpense(
          expenseDto,
          req.user.sub,
        );
    }

    @Post('import')
    @UseInterceptors(FileInterceptor('file'))
    importFile(@UploadedFile() file: Express.Multer.File) {
        const content = file.buffer.toString();
        const records = parse(content, {
            columns: true,
        });
        console.log(records);
        return records
    }
}


