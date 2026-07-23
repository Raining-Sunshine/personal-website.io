import Breadcrumbs from "../../../components/navigation/Breadcrumbs";
import { routes } from "../../../config/routes";
import { universalStudiosSourceUrl } from "../../../config/site";

function UniversalStudiosArticle({ navigate }) {
  const assetBase = import.meta.env.BASE_URL;
  const imageBase = `${assetBase}life/universal-studios-beijing/`;

  return (
    <main className="sub-main">
      <Breadcrumbs
        navigate={navigate}
        items={[
          { label: "Home", route: routes.home },
          { label: "Blogs", route: routes.blog },
          { label: "Life", route: routes.life },
          { label: "Universal Studios Beijing" },
        ]}
      />
      <article className="article-template">
        <div className="article-content">
          <p className="article-meta">July 27, 2022 / Life / Travel</p>
          <h1>闪闪亮亮环球攻略</h1>
          <p className="article-subtitle">Universal Studios Beijing</p>

          <h2>1. 行前订票 / 酒店 / 行李</h2>
          <p>
            根据我们的前期调查，可以不用订环球大酒店或者诺金！比较奢侈并且它所包含的所有特权好像都没什么用。选附近的酒店就完全 OK。具体选择酒店可以根据我们给出的 Excel 表，自主分析。
          </p>
          <figure>
            <img className="article-photo article-photo-wide" src={`${imageBase}hotel-comparison.png`} alt="环球影城附近酒店价格与交通对比表" />
            <figcaption>图表 1：价格以我们查询时为准。</figcaption>
          </figure>
          <p>
            订票不建议直接购买官网门票或者 1.5 日门票。大学生在大众点评和美团有优惠，单日门票 540 拿下。两天 1080 RMB。多出来的钱可以拿来买优速通。
          </p>
          <p>
            优速通实际上是可以买单项的，在小程序就能买。不要买那个 700 的优速通，那个每个项目只能玩一次，并且还包含很多本来不需要用优速通、排队也很快的项目，买那个血亏。建议买禁忌之旅、火种源争夺战、侏罗纪大冒险的单项优速通。当天早上买就可以了（注意会售罄哦，要抓紧呐）。
          </p>
          <p>
            巫师袍、领带建议走之前淘宝买好，会比园区内便宜很多；不过魔杖选择巫师嘛，我们是在奥利凡德买的：）并且一定要自带一件雨衣，为未来水世界的表演做准备。入园不要带大件行李，退房后在酒店寄存就好了。大部分酒店都会提供这项服务。
          </p>
          <p><strong>附：单项优速通购买方法。</strong></p>
          <div className="article-image-grid" aria-label="单项优速通购买步骤截图">
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}express-pass-entry.png`} alt="环球影城小程序首页的优速通入口" />
              <figcaption>在小程序首页向右划，找到“优速通”。</figcaption>
            </figure>
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}single-express-pass.png`} alt="环球影城小程序中的环球单项优速通" />
              <figcaption>选择“环球单项优速通”。</figcaption>
            </figure>
            <figure>
              <img className="article-photo article-photo-phone" src={`${imageBase}single-pass-options.png`} alt="环球单项优速通项目选择页面" />
              <figcaption>选择想购买的具体项目。</figcaption>
            </figure>
          </div>

          <h2>2. 入园游玩建议与用餐</h2>
          <p>
            园区是早上 10 点开门，但是尽量九点钟左右就要到城市大道门口的安检处（八点开门）安检。然后快速冲到大门口排队，并且在小程序首页预约入园。来得太晚可能不能在 10 点前进入园区。
          </p>
          <p>
            如果没有买单项优速通，那么建议直接赶去禁忌之旅、火种源争夺战、侏罗纪大冒险这三个项目，因为早上排队人是最少的。其次就是下午四五点左右，排队时间可能降到 60 分钟。晚上六点多后排队时长会降到 40 分钟。但是如果不能在七点前进入项目，项目就会关门。
          </p>
          <p>
            买了优速通的话，可以先去一些人不太多的项目，比如小黄人或者鹰马飞行这一类。等到中午人很多，每个项目都排很久，比如禁忌之旅排队要 100 分钟时，拿着优速通去玩那些大热项目就可以了。建议最后再去“灯光，摄影，开拍！”，这个项目全天排队时间不超过 20 分钟，出去路过时去玩就好。霸天虎过山车在下午四五点钟也会人比较少，可以考虑 3:30 排不可驯服演出，四点半左右出来就去霸天虎和火种源争夺战。
          </p>
          <p>
            环球会有一些演出，强烈推荐不可驯服和未来水世界。未来水世界不需要提早特别多去排队，因为拿着雨衣的话可以直接去第一排。我们进场时距离演出开始只有 3 分钟，一点队都没排就到了第一排看演出。不可驯服建议提前半小时去排队，以免座位没了。六点钟左右会有环球大巡游，主路会被封锁和占用。如果不想看的话，建议提前做好那时的路线规划，或者干脆就在一个园区里玩就好。
          </p>
          <p>
            不论如何，建议多刷小程序，它提供的时间是相对准确的。另外，禁忌之旅不需要存手机，可以在城堡里照照相。而霸天虎过山车除了眼镜都必须存到柜子里，不然工作人员会让你重新存。
          </p>

          <h2>3. 吃饭</h2>
          <p>
            吃饭的话我们去了三把扫帚和哈蒙德餐厅。三把扫帚相对便宜并且量大，但是需要排队。餐厅里可以直接点黄油啤酒，但是加菜的话要重新排队。哈蒙德餐厅量相对少一些也贵一些，但是餐厅极为“上流”，并且可以发短信叫号等位。两家餐厅菜品都很好吃。
          </p>
          <p>
            黄油啤酒可以在猪头酒吧购买，排队人少极了！小黄人雪糕可以在超萌漩漩涡那个大厅里的店购买。小黄人爆米花可以在好莱坞大道那里购买。小推车排队的人太多，极不推荐。
          </p>

          <h2>4. 拍照</h2>
          <p>
            如果要拍照，建议早上或者下午快闭园再拍。那时候街道上的人很少，非常适合拍照。好莱坞、哈利波特、小黄人这三个园区比较适合拍照，外景美极了！功夫熊猫理论上布景也很适合，但是灯光太暗了，拍照大佬可以考虑那里。努布拉岛在飞越侏罗纪那个大厅里，内景也很适合拍照！
          </p>

          <aside className="article-note">
            <p>
              放在最后的补充：以上的 bb 也全都是我们俩的个人体验啦，每个人进去玩的感受肯定都有所不同，我们的唠叨和小红书上的攻略也不大一样（比如鹰马飞行有些朋友觉得无聊但我们还是叫超大声），大家也不用拘泥于攻略，自己随心所欲玩得爽就好啦！祝朋友们都可以拥有独一无二的、最完美的环影之旅！！！
            </p>
            <p>以上就是我想到的所有啦，惠惠快来补充！bεOvO3d</p>
            <p>阳阳请作为体验师原地出道！惠惠也补完啦！:3</p>
          </aside>

          <p className="article-source">
            原文：<a href={universalStudiosSourceUrl} target="_blank" rel="noreferrer">Raining Sunshine / Blogger</a>
          </p>
        </div>
      </article>
    </main>
  );
}

export default UniversalStudiosArticle;
