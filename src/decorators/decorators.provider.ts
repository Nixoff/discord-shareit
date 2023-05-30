import { Provider } from '@nestjs/common';
import { Routine } from './routine.decorator';

export const RoutineProvider: Provider = {
    provide: 'ROUTINE_PROVIDER',
    useValue: Routine,
};
