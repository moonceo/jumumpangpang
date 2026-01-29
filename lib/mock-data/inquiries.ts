import { Inquiry, InquiryStats } from "@/types/inquiry";
import { format, subDays, subHours } from "date-fns";

const now = new Date();

export const mockInquiryStats: InquiryStats = {
    unansweredCount: 4,
    answeredCount: 128,
    totalCount: 1532,
    connectedStores: 5
};

export const mockInquiries: Inquiry[] = [
    // 1. Unanswered - Naver (Normal)
    {
        id: "inq_001",
        marketType: "naver",
        status: "waiting",
        type: "배송문의",
        content: "배송 언제 시작되나요? 주말 전에 받고 싶은데 가능한지 확인 부탁드립니다. 어제 주문했어요.",
        product: {
            name: "북유럽 인테리어 모던 거실장 TV장 2000 size",
            thumbnail: "/images/dummy/tv-stand.png",
            optionName: "화이트 / 2000mm",
            marketLink: "https://smartstore.naver.com"
        },
        writerId: "happy_day",
        writerName: "김*수",
        createdAt: format(subHours(now, 2), "yyyy-MM-dd HH:mm"),
    },

    // 2. Unanswered - Coupang (Product Question)
    {
        id: "inq_002",
        marketType: "coupang",
        status: "waiting",
        type: "상품문의",
        content: "이거 혹시 조립 필요한가요? 아니면 완제품으로 오나요? 설명서가 따로 있는지 궁금합니다.",
        product: {
            name: "샤오미 로봇청소기 X10 Plus 물걸레 겸용",
            thumbnail: "/images/dummy/robot-vacuum.png",
            marketLink: "https://coupang.com"
        },
        writerId: "user1234",
        createdAt: format(subHours(now, 5), "yyyy-MM-dd HH:mm"),
    },

    // 3. Unanswered - 11st (External Link)
    {
        id: "inq_003",
        marketType: "11st",
        status: "waiting",
        type: "교환/반품",
        content: "제품에 스크래치가 있어서 교환하고 싶습니다. 사진 첨부합니다. 확인해주세요.",
        product: {
            name: "원목 캣타워 대형 캣폴",
            thumbnail: "/images/dummy/cat-tower.png",
            optionName: "5단 / 스크래쳐 추가",
            marketLink: "https://11st.co.kr"
        },
        writerId: "cat_lover",
        createdAt: format(subDays(now, 1), "yyyy-MM-dd HH:mm"),
        isExternal: true,
        externalLink: "https://soffice.11st.co.kr/view/qna",
    },

    // 4. Unanswered - ESM (External Link)
    {
        id: "inq_004",
        marketType: "esm",
        status: "waiting",
        type: "기타",
        content: "대량 구매 가능한가요? 10개 정도 필요한데 할인 되는지 문의드립니다.",
        product: {
            name: "접이식 캠핑 의자 경량 체어",
            thumbnail: "/images/dummy/camping-chair.png",
            marketLink: "https://gmarket.co.kr"
        },
        writerId: "camping_go",
        createdAt: format(subDays(now, 1), "yyyy-MM-dd HH:mm"),
        isExternal: true,
        externalLink: "https://www.esmplus.com",
    },

    // 5. Answered - Naver
    {
        id: "inq_005",
        marketType: "naver",
        status: "answered",
        type: "배송문의",
        content: "배송이 너무 늦는데요 언제 오나요?",
        product: {
            name: "빈티지 글라스 조명 탁상 무드등",
            thumbnail: "/images/dummy/vintage-lamp.png",
            marketLink: "https://smartstore.naver.com"
        },
        writerId: "waiting_person",
        createdAt: format(subDays(now, 2), "yyyy-MM-dd HH:mm"),
        replyContent: "안녕하세요 고객님. 통관 지연으로 불편을 드려 죄송합니다. 현재 국내 입항하여 통관 진행 중이며, 2~3일 내 수령 가능하실 것으로 예상됩니다.",
        repliedAt: format(subDays(now, 1), "yyyy-MM-dd HH:mm"),
    }
];
