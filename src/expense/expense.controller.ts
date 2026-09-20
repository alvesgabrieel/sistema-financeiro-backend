import { Body, Controller, Post, Req, UnauthorizedException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';
import { ExpenseService } from './expense.service';
import type { ExpenseDto } from './dtos/expense.dto';
import { Expense } from './interfaces/expense.interface';
import type { Request } from 'express';

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
        console.log('Nome:', file.originalname)
        console.log('Tipo:', file.mimetype)
        console.log('Tamanho:', file.size)
        console.log('Conteúdo:')
        console.log(file.buffer.toString())
    }

}


