import { SetMetadata } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

export const Routine = (intervalo: number): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        let subscription: Subscription | undefined;

        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const context = this;

            subscription = interval(intervalo * 1000)
                .pipe(
                    tap(() => {
                        originalMethod.apply(context, args);
                    })
                )
                .subscribe();
        };

        const stopRoutine = () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };

        SetMetadata('routine', { intervalo, stopRoutine })(descriptor.value);
    };
};
