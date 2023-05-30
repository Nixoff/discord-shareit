import { Injectable } from '@nestjs/common';
import { Routine } from 'src/decorators/routine.decorator';

@Injectable()

export class NotionRoutineService {

    public name: string = "service test"

    @Routine(10)
    public routineTest() {
        console.log(`executando o serviço de rotina ${this.name}`)
    }

}

const exec = new NotionRoutineService();
exec.routineTest();