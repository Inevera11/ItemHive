import { sanitizeForUrl } from './sanitizeForUrl';
import { AllCollectionsData } from './types';
import { v4 as uuidv4 } from 'uuid';

export const getMockedCollections = (username: string): AllCollectionsData => {
    const data = [
        {
            name: 'CzesciElektroniczne',
            owner: 'babcia',
            others: ['dziadek', 'wnuk', username],
            items: [
                {
                    name: 'Opornik 1 Ohm',
                    updates: [
                        {
                            timestamp: '2024-12-10T23:59:59.000Z',
                            absoluteAmount: 256,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-12T23:59:59.000Z',
                            absoluteAmount: 128,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-14T23:59:59.000Z',
                            absoluteAmount: 64,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-16T23:59:59.000Z',
                            absoluteAmount: 64,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-18T23:59:59.000Z',
                            absoluteAmount: 32,
                            user: 'wnuk',
                        },
                        {
                            timestamp: '2024-12-20T23:59:59.000Z',
                            absoluteAmount: 16,
                            user: 'babcia',
                        },
                    ],
                },
                {
                    name: 'Opornik 10 Ohm',
                    updates: [
                        {
                            timestamp: '2024-12-16T23:59:59.000Z',
                            absoluteAmount: 128,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-18T23:59:59.000Z',
                            absoluteAmount: 64,
                            user: 'wnuk',
                        },
                    ],
                },
                {
                    name: 'Kondensator 100uF',
                    updates: [
                        {
                            timestamp: '2024-10-20T23:59:59.000Z',
                            absoluteAmount: 16,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-11-29T23:59:59.000Z',
                            absoluteAmount: 32,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-01T23:59:59.000Z',
                            absoluteAmount: 16,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-04T23:59:59.000Z',
                            absoluteAmount: 64,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-05T23:59:59.000Z',
                            absoluteAmount: 16,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-06T23:59:59.000Z',
                            absoluteAmount: 8,
                            user: 'babcia',
                        },
                    ],
                },
                {
                    name: 'Kondensator 10uF',
                    updates: [
                        {
                            timestamp: '2024-10-10T23:59:59.000Z',
                            absoluteAmount: 16,
                            user: 'babcia',
                        },
                    ],
                },
                {
                    name: 'SN74LS279A Texas Instruments',

                    updates: [
                        {
                            timestamp: '2024-12-15T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-18T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'wnuk',
                        },
                    ],
                },
                {
                    name: 'Dioda LED zielona',
                    updates: [
                        {
                            timestamp: '2024-12-15T23:59:59.000Z',
                            absoluteAmount: 10,
                            user: 'babcia',
                        },
                        {
                            timestamp: '2024-12-18T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'dziadek',
                        },
                    ],
                },
                {
                    name: 'Atmel ATmega8',
                    updates: [
                        {
                            timestamp: '2024-12-10T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-11T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'dziadek',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Współokatorzy',
            owner: 'Bronisław',
            others: ['Bronislaw', 'Jaroslaw', username],
            items: [
                {
                    name: 'Masło 1kg',

                    updates: [
                        {
                            timestamp: '2024-12-12T23:59:59.000Z',
                            absoluteAmount: 30,
                            user: 'Bronislaw',
                        },
                        {
                            timestamp: '2024-12-14T23:59:59.000Z',
                            absoluteAmount: 35,
                            user: 'Bronislaw',
                        },
                        {
                            timestamp: '2024-12-16T23:59:59.000Z',
                            absoluteAmount: 25,
                            user: 'Jaroslaw',
                        },
                        {
                            timestamp: '2024-12-17T23:59:59.000Z',
                            absoluteAmount: 20,
                            user: 'Jaroslaw',
                        },
                        {
                            timestamp: '2024-12-19T23:59:59.000Z',
                            absoluteAmount: 25,
                            user: 'Jaroslaw',
                        },
                        {
                            timestamp: '2024-12-20T23:59:59.000Z',
                            absoluteAmount: 20,
                            user: 'Jaroslaw',
                        },
                    ],
                },
                {
                    name: 'Bułka',
                    updates: [
                        {
                            timestamp: '2024-12-10T23:59:59.000Z',
                            absoluteAmount: 10,
                            user: 'Jaroslaw',
                        },
                        {
                            timestamp: '2024-12-11T23:59:59.000Z',
                            absoluteAmount: 9,
                            user: 'Jaroslaw',
                        },
                        {
                            timestamp: '2024-12-12T23:59:59.000Z',
                            absoluteAmount: 8,
                            user: 'Bronislaw',
                        },
                        {
                            timestamp: '2024-12-17T23:59:59.000Z',
                            absoluteAmount: 7,
                            user: 'Bronislaw',
                        },
                        {
                            timestamp: '2024-12-19T23:59:59.000Z',
                            absoluteAmount: 10,
                            user: 'Bronislaw',
                        },
                        {
                            timestamp: '2024-12-22T23:59:59.000Z',
                            absoluteAmount: 1,
                            user: 'Bronislaw',
                        },
                    ],
                },
            ],
        },
        {
            name: 'Piekarnia',
            owner: 'kierownik',
            others: ['cukiernik', 'piekarz', 'dostawca', 'kierownik', username],
            items: [
                {
                    name: 'Drożdżówka',
                    updates: [
                        {
                            timestamp: '2024-12-12T23:59:59.000Z',
                            absoluteAmount: 30,
                            user: 'cukiernik',
                        },
                        {
                            timestamp: '2024-12-14T23:59:59.000Z',
                            absoluteAmount: 35,
                            user: 'cukiernik',
                        },
                    ],
                },
                {
                    name: 'Chleb zwykły',
                    updates: [
                        {
                            timestamp: '2024-12-10T23:59:59.000Z',
                            absoluteAmount: 10,
                            user: 'piekarz',
                        },
                        {
                            timestamp: '2024-12-11T23:59:59.000Z',
                            absoluteAmount: 9,
                            user: 'piekarz',
                        },
                    ],
                },
                {
                    name: 'Precel krakowski',
                    updates: [
                        {
                            timestamp: '2024-12-22T23:59:59.000Z',
                            absoluteAmount: 25,
                            user: 'cukiernik',
                        },
                        {
                            timestamp: '2024-12-23T23:59:59.000Z',
                            absoluteAmount: 30,
                            user: 'piekarz',
                        },
                    ],
                },
            ],
        },
        {
            name: 'ZłoteMonety',
            owner: 'dziadek',
            others: [username, 'Emil'],
            items: [
                {
                    name: 'Double Eagle',
                    updates: [
                        {
                            timestamp: '2024-12-12T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-14T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-16T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-17T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-18T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-20T23:59:59.000Z',
                            absoluteAmount: 5,
                            user: 'dziadek',
                        },
                        {
                            timestamp: '2024-12-22T23:59:59.000Z',
                            absoluteAmount: 4,
                            user: 'dziadek',
                        },
                    ],
                },
            ],
        },
    ];

    data.forEach((collection) => {
        collection.items = collection.items.map((item) => {
            return {
                ...item,
                id: uuidv4(),
                url: sanitizeForUrl(item.name),
            };
        });
    });
    return data as AllCollectionsData;
};
