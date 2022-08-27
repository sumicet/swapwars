// import { BigNumber, ethers } from 'ethers';
// import { getContract } from 'src/web3';

// const PPM = 1000000;
// const decimals = BigNumber.from(18);
// const decimalsBN = BigNumber.from(10).pow(decimals);

// const useContract = (name: string) => {
//     return () => '' as any;
// };

// function AppX() {
//     const tryMint = async () => {
//         const Grogu = await getContract('Grogu');
//         const Mando = await getContract('Mando');
//         if (!Grogu || !Mando) {
//             return;
//         }

//         console.log(Grogu);

//         // @ts-ignore
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         if (!provider) {
//             return;
//         }

//         const accounts = await provider.listAccounts();
//         if (!accounts || !accounts.length) {
//             return;
//         }

//         const account = accounts[0];

//         await Grogu.mint(BigNumber.from(PPM).pow(3).mul(decimalsBN));
//         // await Mando.mint(BigNumber.from(PPM).pow(3));
//     };

//     const createPool = async () => {
//         try {
//             // Step 0: Create wallet

//             const Grogu = await getContract('Grogu');
//             const Mando = await getContract('Mando');
//             const TokenSwap = await getContract('TokenSwap');

//             if (!Grogu || !Mando || !TokenSwap) {
//                 return;
//             }

//             // @ts-ignore
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             if (!provider) {
//                 return;
//             }

//             const accounts = await provider.listAccounts();
//             if (!accounts || !accounts.length) {
//                 return;
//             }

//             const account = accounts[0];

//             const signer = await provider.getSigner(account);

//             console.log('Signer:', account);

//             if (!signer) {
//                 return;
//             }

//             const groguSupply = BigNumber.from(1000000).mul(decimalsBN);
//             const mandoSupply = BigNumber.from(500000).mul(decimalsBN);

//             const exchangeRate = BigNumber.from(2 * PPM);
//             const slippage = BigNumber.from(PPM * PPM);

//             const app1 = await Grogu.approve(TokenSwap.address, groguSupply);
//             const app2 = await Mando.approve(TokenSwap.address, mandoSupply);

//             const receipt1 = await app1.wait();
//             const receipt2 = await app2.wait();

//             if (receipt1 && receipt2) {
//                 const pool = await TokenSwap.createPool(
//                     Grogu.address,
//                     Mando.address,
//                     groguSupply,
//                     mandoSupply,
//                     slippage,
//                     exchangeRate
//                 );

//                 await pool.wait();

//                 console.log('Created Pool');
//             }
//         } catch (err: any) {
//             console.log(err);
//         }
//     };

//     const swap = async () => {
//         try {
//             const swapAmount = BigNumber.from(10).mul(decimalsBN);
//             const Grogu = await getContract('Grogu');
//             const Mando = await getContract('Mando');
//             const TokenSwap = await getContract('TokenSwap');

//             // @ts-ignore
//             const provider = new ethers.providers.Web3Provider(window.ethereum);

//             if (!provider) {
//                 return;
//             }

//             const accounts = await provider.listAccounts();
//             if (!accounts || !accounts.length) {
//                 return;
//             }

//             const account = accounts[0];

//             console.log('Signer:', account);

//             if (!Grogu || !Mando || !TokenSwap) {
//                 return;
//             }

//             const currentGroguBalance = await Grogu.balanceOf(account);

//             console.log('GROGU:', ethers.utils.formatEther(await currentGroguBalance.toString()));

//             const approval = await Grogu.approve(TokenSwap.address, swapAmount);

//             const receipt = await approval.wait();

//             if (!receipt) {
//                 return;
//             }

//             const tx = await TokenSwap.buy(0, swapAmount);
//             await tx.wait();

//             console.log('Bought 10 MANDO');
//         } catch (err: any) {
//             console.log(err);
//         }
//     };

//     const getPoolInfo = async () => {
//         const Grogu = await getContract('Grogu');
//         const Mando = await getContract('Mando');
//         const TokenSwap = await getContract('TokenSwap');

//         // @ts-ignore
//         const provider = new ethers.providers.Web3Provider(window.ethereum);

//         const accounts = await provider.listAccounts();
//         if (!accounts || !accounts.length) {
//             return;
//         }

//         const account = accounts[0];

//         if (!Grogu || !Mando || !TokenSwap) {
//             return;
//         }

//         const pool = await TokenSwap.pools(0);
//         console.log(pool);
//         console.log('Grogu supply', ethers.utils.formatEther(pool.tokenAsupply));
//         console.log('Mando supply', ethers.utils.formatEther(pool.tokenBsupply));
//         console.log('Slippage', ethers.utils.formatEther(pool.slippage));
//         console.log('Exchange rate', ethers.utils.formatEther(pool.exchageRate));
//     };

//     const getPastEvents = async () => {
//         const Grogu = await getContract('Grogu');
//         const Mando = await getContract('Mando');
//         const TokenSwap = await getContract('TokenSwap');

//         const eventFilter = TokenSwap?.filters.PoolCreated();

//         console.log(eventFilter);
//         if (!eventFilter) {
//             return;
//         }
//         const events = await TokenSwap?.queryFilter(eventFilter);

//         console.log(events);
//     };

//     return (
//         <div>
//             <button onClick={createPool}>Create Pool</button>
//             <button onClick={swap}>Swap</button>
//             <button onClick={getPastEvents}>Get past events</button>
//             <button onClick={getPoolInfo}>Get pool info</button>
//             <button onClick={tryMint}>Try mint</button>
//             <h1 style={{ color: 'red' }}>hello</h1>
//         </div>
//     );
// }

// export default AppX;

// export interface Pool {
//     id: string;
//     in: string | null;
//     out: string | null;
//     exchangeRate: string | null;
//     inSupply: string | null;
//     outSupply: string | null;
// }

export {};
