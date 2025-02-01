import { Company } from '@/entities';
import { v4 } from 'uuid';

export const companiesData: Company[] = [
  {
    id: v4(),
    name: 'СтройМастер',
    address: { country: 'Россия', city: 'Москва', street: 'Ленина', houseNumber: '15' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ГрандСтрой',
    address: { country: 'Россия', city: 'Санкт-Петербург', street: 'Невский проспект', houseNumber: '22' },
    selected: false,
  },
  {
    id: v4(),
    name: 'МонолитПро',
    address: { country: 'Россия', city: 'Казань', street: 'Победы', houseNumber: '33' },
    selected: false,
  },
  {
    id: v4(),
    name: 'БетонСервис',
    address: { country: 'Россия', city: 'Екатеринбург', street: 'Мира', houseNumber: '7' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ФундаментГрупп',
    address: { country: 'Беларусь', city: 'Минск', street: 'Советская', houseNumber: '19' },
    selected: false,
  },
  {
    id: v4(),
    name: 'КирпичСтрой',
    address: { country: 'Беларусь', city: 'Брест', street: 'Гагарина', houseNumber: '12' },
    selected: false,
  },
  {
    id: v4(),
    name: 'СтальБилд',
    address: { country: 'Беларусь', city: 'Гомель', street: 'Октябрьская', houseNumber: '8' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ЭкоДомСтрой',
    address: { country: 'Казахстан', city: 'Астана', street: 'Абая', houseNumber: '5' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ТехноСтрой',
    address: { country: 'Казахстан', city: 'Алматы', street: 'Сатпаева', houseNumber: '27' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ЛюксСтрой',
    address: { country: 'Казахстан', city: 'Караганда', street: 'Байтурсынова', houseNumber: '13' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ДомЭксперт',
    address: { country: 'Россия', city: 'Воронеж', street: 'Чехова', houseNumber: '9' },
    selected: false,
  },
  {
    id: v4(),
    name: 'СтройИнвест',
    address: { country: 'Россия', city: 'Самара', street: 'Промышленная', houseNumber: '6' },
    selected: false,
  },
  {
    id: v4(),
    name: 'НовыйДом',
    address: { country: 'Россия', city: 'Краснодар', street: 'Красная', houseNumber: '14' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ПремиумСтрой',
    address: { country: 'Россия', city: 'Ростов-на-Дону', street: 'Садовая', houseNumber: '21' },
    selected: false,
  },
  {
    id: v4(),
    name: 'БрусовойДом',
    address: { country: 'Россия', city: 'Тюмень', street: 'Лесная', houseNumber: '4' },
    selected: false,
  },
  {
    id: v4(),
    name: 'АртСтрой',
    address: { country: 'Беларусь', city: 'Витебск', street: 'Кирова', houseNumber: '18' },
    selected: false,
  },
  {
    id: v4(),
    name: 'МегастройПлюс',
    address: { country: 'Беларусь', city: 'Гродно', street: 'Зеленая', houseNumber: '10' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ГарантСтрой',
    address: { country: 'Казахстан', city: 'Шымкент', street: 'Достык', houseNumber: '25' },
    selected: false,
  },
  {
    id: v4(),
    name: 'ЕвроСтрой',
    address: { country: 'Казахстан', city: 'Костанай', street: 'Жамбыла', houseNumber: '30' },
    selected: false,
  },
  {
    id: v4(),
    name: 'БетонГарант',
    address: { country: 'Россия', city: 'Нижний Новгород', street: 'Пушкинская', houseNumber: '3' },
    selected: false,
  },
];
