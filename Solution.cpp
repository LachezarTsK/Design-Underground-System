
#include <array>
#include <string>
#include <algorithm>
#include <unordered_map>
using namespace std;

class UndergroundSystem {

    struct CheckIn {
        string checkInStation{};
        int checkInTime{};
        CheckIn(string checkInStation, int checkInTime) : checkInStation{checkInStation}, checkInTime{checkInTime}{}
        CheckIn() = default;
        ~CheckIn() = default;
    };

    unordered_map<int, CheckIn> checkInData;
    unordered_map<string, array<int, 2>> journeyData;

public:
    UndergroundSystem() = default;
    ~UndergroundSystem() = default;

    void checkIn(int ID, string checkInStation, int checkInTime) {
        checkInData[ID] = CheckIn(checkInStation, checkInTime);
    }

    void checkOut(int ID, string checkOutStation, int checkOutTime) {
        CheckIn checkIn{ checkInData[ID]};
        checkInData.erase(ID);

        string journey = checkIn.checkInStation + "->" + checkOutStation;

        //C++20: journeyData.contains(journey)
        if (journeyData.find(journey) == journeyData.end()) {
            journeyData[journey] = array<int, 2>{};
        }

        journeyData[journey][0] += checkOutTime - checkIn.checkInTime;
        journeyData[journey][1]++;
    }

    double getAverageTime(string startStation, string endStation) {
        string journey = startStation + "->" + endStation;
        return static_cast<double> (journeyData[journey][0]) / journeyData[journey][1];
    }
};
