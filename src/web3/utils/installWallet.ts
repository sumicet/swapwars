import { config } from '../../config';

export const installWallet = () => window.open(config.wallets.download.metamask, '_blank');
